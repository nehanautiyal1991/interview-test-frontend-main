import { FC, ReactElement, ReactNode } from 'react';
import { IVariant, ICartItem } from '../../types/products';

import './variants-all.styles.css';

interface Props {
  variant: IVariant;
  onHandleAddToCart: (clickedtem: ICartItem) => void;
  selectedProduct: ICartItem;
}

const VariantsAll: FC<Props> = ({ variant, selectedProduct, onHandleAddToCart }): ReactElement => {
  const { id, quantity, image, isDiscontinued } = variant;

  const isValidVariant =
    isDiscontinued === true || (isDiscontinued === false && quantity === 0) ? false : true;

  return (
    <div key={id} className="variant-div">
      <label
        className="chip-variant"
        style={{ visibility: `${isValidVariant ? 'hidden' : 'visible'}` }}
      >
        Invalid
      </label>

      <button className="variantButton" disabled={!isValidVariant}>
        <img src={image} className="variant-image" />
      </button>

      {isValidVariant ? (
        <button className="cart-button" onClick={() => onHandleAddToCart(selectedProduct)}>
          Add to cart
        </button>
      ) : (
        ''
      )}
    </div>
  );
};
export default VariantsAll;
