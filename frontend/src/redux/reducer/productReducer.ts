import { FETCH_PRODUCTS } from '../action/types';
import { IProductItem } from '../../types/products';

const products: IProductItem[] = [];

const productReducer = (state = products, action: { type: any; payload: IProductItem[] }) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [...state, ...action.payload];

    default:
      return state;
  }
};
export default productReducer;
