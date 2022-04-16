import { FC, ReactElement } from 'react';
import { useContext } from 'react';
import { ICartItem } from '../../types/products';
import CartItem from '../cart-item/cart-item';
import { CartContext } from '../../cart-context';
import './cart.styles.css';

export type Props = {
  cartItems: ICartItem[];
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (clickedItem: ICartItem) => void;
};

const Cart: FC<Props> = ({ cartItems, addToCart, removeFromCart }): ReactElement => {
  const { setIsOpen } = useContext(CartContext);
  const closeCart = () => setIsOpen(false);

  const totalPrice = cartItems
    .reduce((total, item) => total + (item.variants.priceCents * item.quantity) / 100, 0)
    .toFixed(2);

  return (
    <div className="cart-modal">
      <div className="cart-container">
        <button className="close-button" onClick={closeCart}>
          →
        </button>
        <div className="cart-items-container">
          {cartItems?.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
        <div className="total-container">
          <span>Total: ${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
