import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const rootReducers = combineReducers({ products: productReducer, cart: cartReducer });

export default rootReducers;
