import { FC, ReactElement, useState, useEffect, useMemo, useCallback } from 'react';
import { IProductItem, ICartItem, IVariant } from '../../types/products';
import './product-card.styles.css';
import VariantsAll from '../variants/variants-all';
import SelectableOption from '../selectable-option/selectable-option';

interface Props {
  product: IProductItem;
  handleAddToCart: (clickedtem: ICartItem) => void;
}

const ProductCard: FC<Props> = ({ product, handleAddToCart }): ReactElement => {
  const { name, defaultImage: imageSrc, description, variants, isDiscontinued } = product;
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({} as ICartItem);
  const [variantId, setVariantId] = useState<any>('');

  const removeKey = (object: any, key: any) =>
    Object.entries(object)
      .filter(([k]) => k !== key)
      .reduce((result: any, [key, value]) => {
        result[key] = value;
        return result;
      }, {});
  //set the values for dropdowns
  const variantsOptions = useMemo(
    () =>
      [
        ...product.variants
          .map(({ selectableOptions }) => selectableOptions)
          .flat()
          .reduce(
            (result, { type, value }) => result.set(type, (result.get(type) || []).concat(value)),
            new Map(),
          )
          .entries(),
      ].map(([key, values]) => [key, [...new Set(values)]]),
    [product.variants],
  );

  const variantsByKey = useMemo(
    () =>
      new Map(
        product.variants.map(({ id, selectableOptions }) => [
          variantsOptions
            .map(([key]) => selectableOptions.find(({ type }) => type === key))
            .filter((x) => x)
            .map(({ type, value }: any) => `${type}::${value}`)
            .join('++'),
          id,
        ]),
      ),
    [product.variants, variantsOptions],
  );
  //selects with enabled value to disable non existant
  //  combinations
  const variantsSelects = useMemo(() => {
    const optionGroup = product.variants.map(({ selectableOptions }) =>
      selectableOptions
        .map(({ type, value }) => [type, value])
        .reduce((result, [key, value]) => result.set(key, value), new Map()),
    );
    const selected = Object.entries(selectedVariants);
    return variantsOptions.map(([key, options]) => {
      //selected options munus current option type
      const sel = selected.filter(([k]) => k !== key);
      return [
        key,
        options.map((option: any) => [
          option,
          optionGroup
            .filter((variant) => sel.every(([key, value]) => variant.get(key) === value))
            .some((v) => v.get(key) === option),
        ]),
      ];
    });
  }, [product.variants, selectedVariants, variantsOptions]);

  const currentSelectedVariant = variants.find((c) => c.id === variantId);

  useEffect(() => {
    const variantId = variantsByKey.get(
      variantsOptions
        .map(([key]) => key)
        .filter((key) => selectedVariants[key as keyof {}])
        .map((key) => `${key}::${selectedVariants[key as keyof {}]}`)
        .join('++'),
    );
    setVariantId(variantId);
    setSelectedProduct({
      product: product,
      variants: currentSelectedVariant ?? ({} as IVariant),
      quantity: 0,
    });
  }, [selectedVariants, variantsOptions, variantsByKey, currentSelectedVariant]);

  const changeSelectedVariant = useCallback(
    (value: string, key: any) =>
      setSelectedVariants((current) =>
        value !== 'NONE'
          ? {
              ...current,
              [key]: value,
            }
          : removeKey(current, key),
      ),
    [],
  );

  return (
    <div className="product-card-container">
      <div className="product-card">
        <img src={imageSrc} />
      </div>

      <div className="variants">
        <>
          <div className="product-card-details">
            <span className="product-name">{name} </span>
            <span className="product-description"> {description} </span>
          </div>
          {!isDiscontinued ? (
            <div>
              <div className="selectable-option-container">
                {variantsSelects.map(([key, values]) => (
                  <SelectableOption
                    key={key}
                    type={key}
                    values={values}
                    onSelectedVariants={selectedVariants}
                    onChangeSelectedVariant={changeSelectedVariant}
                  />
                ))}
              </div>
              <div className="product-variant">
                {currentSelectedVariant ? (
                  <VariantsAll
                    variant={currentSelectedVariant ?? ({} as IVariant)}
                    onHandleAddToCart={handleAddToCart}
                    selectedProduct={selectedProduct}
                  />
                ) : (
                  <h5>
                    No variant available for selected combination. Please select different option
                  </h5>
                )}
              </div>
            </div>
          ) : (
            <label className="chip">OOS</label>
          )}
        </>
      </div>
    </div>
  );
};

export default ProductCard;
