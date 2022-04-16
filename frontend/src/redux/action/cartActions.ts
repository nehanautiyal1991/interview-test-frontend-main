import { ICartItem } from '../../types/products';
import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

export const addToCart =
  (product: ICartItem) => (dispatch: (arg0: { type: string; payload: ICartItem }) => void) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };
export const removeFromCart =
  (product: ICartItem) => (dispatch: (arg0: { type: string; payload: ICartItem }) => void) => {
    dispatch({ type: REMOVE_FROM_CART, payload: product });
  };
