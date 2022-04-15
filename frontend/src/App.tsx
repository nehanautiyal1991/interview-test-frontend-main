import { useState, useEffect, FC, ReactElement } from 'react';
import { useContext } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { addToCart, removeFromCart } from './redux/action/cartActions';
import { fetchProducts } from './redux/action/productActions';
import { Drawer } from '@mui/material';
import { CartContext } from './cart-context';
import Grid from '@mui/material/Grid';
import Cart from './components/cart/cart';
import ProductCard from './components/product-card/product-card';
import Navigation from './components/navigation/navigation';
import { IProductItem, ICartItem } from './types/products';

import './App.css';

const App: FC = (): ReactElement => {
  const { isOpen, setIsOpen } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state: RootStateOrAny) => state.products);
  const cart = useSelector((state: RootStateOrAny) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCart = (clickedItem: ICartItem) => {
    dispatch(addToCart(clickedItem));
  };

  const handleRemoveFromCart = (clickedItem: ICartItem) => {
    dispatch(removeFromCart(clickedItem));
  };

  if (isLoading) return <h3>Loading....</h3>;

  if (error) return <h3>Something went Wrong...</h3>;

  return (
    <div className="App">
      <Navigation />

      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <div style={{ width: 400 }}>
          <Cart
            cartItems={cart}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </div>
      </Drawer>

      <div className="products-listing">
        <Grid container spacing={2} flexDirection="column">
          {products?.map((item: IProductItem) => (
            <Grid item key={item.id}>
              <ProductCard key={item.id} product={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default App;
