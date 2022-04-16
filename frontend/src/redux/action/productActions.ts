import { FETCH_PRODUCTS } from './types';
import { IProductItem } from '../../types/products';

export const fetchProducts =
  () => async (dispatch: (arg0: { type: string; payload: IProductItem }) => void) => {
    await fetch('http://localhost:8000/products')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: FETCH_PRODUCTS, payload: data.products });
      });
  };
