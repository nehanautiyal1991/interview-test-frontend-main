import { FETCH_PRODUCTS } from '../action/types';
const products = [];

const productReducer = (state = products, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [...state, ...action.payload];

    default:
      return state;
  }
};
export default productReducer;
