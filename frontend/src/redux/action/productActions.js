import { FETCH_PRODUCTS } from './types';

export const fetchProducts = () => async (dispatch) => {
  await fetch('http://localhost:8000/products')
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: FETCH_PRODUCTS, payload: data.products });
    });
};
