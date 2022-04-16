import { FC, ReactElement } from 'react';
import { ICartItem } from '../../types/products';
import './cart-item.styles.css';

interface Props {
  item: ICartItem;
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (clickedItem: ICartItem) => void;
}

const CartItem: FC<Props> = ({ item, addToCart, removeFromCart }): ReactElement => {
  const { id, name, defaultImage: imageSrc } = item.product;
  const { id: variantId, image, priceCents } = item.variants;
  const price = (priceCents / 100).toFixed(2);
  return (
    <div className="cart-item-container">
      <img src={imageSrc} alt={name} />
      <div className="cart-item-details">
        <span>{name} </span>
        <span> Quantity: {item.quantity} </span>
        <span> Price: ${price} Each</span>
        <span> Variant</span>
        <div className="cart-item-variant-container">
          <img src={image} alt={image} />
          <div className="cart-item-option-container">
            {item.variants.selectableOptions.map((item) => (
              <span key={item.value}>
                {item.type}: {item.value}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button className="cart-quantity-button" onClick={() => removeFromCart(item)}>
        -
      </button>
      <h3>{item.quantity}</h3>

      <button className="cart-quantity-button" onClick={() => addToCart(item)}>
        +
      </button>
    </div>
  );
};

export default CartItem;
