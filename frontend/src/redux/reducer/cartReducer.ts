import { ADD_TO_CART, REMOVE_FROM_CART } from '../action/types';
import { ICartItem } from '../../types/products';

const cart: ICartItem[] = [];

const cartReducer = (state = cart, action: { type: any; payload: ICartItem }) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;

      //check if product already exist in the cart
      const isItemInCart = state.find((item) => item.variants.id === product.variants.id);

      if (isItemInCart) {
        //increase the quantity
        return state.map((item) =>
          item.variants.id === product.variants.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        const product = action.payload;
        return [...state, { ...product, quantity: 1 }];
      }

    case REMOVE_FROM_CART:
      const itemToBeRemoved = action.payload;
      const isExistInCart = state.find((item) => item.variants.id === itemToBeRemoved.variants.id);

      if (isExistInCart?.quantity === 1) {
        debugger;
        return state.filter((item) => item.variants.id !== isExistInCart.variants.id);
      } else {
        return state.map((item) =>
          item.variants.id === itemToBeRemoved.variants.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }

    default:
      return state;
  }
};
export default cartReducer;
