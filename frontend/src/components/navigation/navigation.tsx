import { FC, ReactElement } from 'react';
import { useContext } from 'react';
import { useSelector } from '../../store';
import { CartContext } from '../../cart-context';
import './navigation.styles.css';

const Navigation: FC = (): ReactElement => {
  const { isOpen, setIsOpen } = useContext(CartContext);
  const toggleCart = () => setIsOpen(!isOpen);

  const cart = useSelector((state) => state.cart);

  return (
    <nav className="navigation-bar">
      <div className="cart-icon" onClick={toggleCart}>
        Cart
        <span className="badge" color="error">
          {cart.length}
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
