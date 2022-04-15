import { FC, ReactElement, ReactNode } from 'react';
import { SelectionOption } from '../../types/products';
import './selectable-option.styles.css';

interface Props {
  type: string;
  values: any;
  onSelectedVariants: object;
  onChangeSelectedVariant: (value: string, key: any) => void;
}

const SelectableOption: FC<Props> = ({
  type,
  values,
  onSelectedVariants,
  onChangeSelectedVariant,
}): ReactElement => {
  return (
    <div key={type} style={{ margin: '10px' }}>
      <h3 className="product-label"> {type}</h3>

      <select
        value={onSelectedVariants[type as keyof {}]}
        onChange={(e) => onChangeSelectedVariant(e.target.value, type)}
      >
        <option value={'NONE'}>Select option</option>
        {values.map(([value]: [value: any]) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectableOption;
