import { ADD_TO_CART, REMOVE_FROM_CART } from '../action/types';
const cart = [];

const objectsEqual = (o1, o2) =>
  Object.keys(o1).length === Object.keys(o2).length &&
  Object.keys(o1).every((p) => o1[p] === o2[p]);

const arraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

const condition = (item, product) => {
  return (
    item.product.id === product.product.id &&
    item.variants.id === product.variants.id &&
    arraysEqual(item.variants.selectableOptions, product.variants.selectableOptions)
  );
};

const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;

      //check if product already exist in the cart
      const isItemInCart = state.find((item) => condition(item, product));

      if (isItemInCart) {
        //increase the quantity
        return state.map((item) =>
          condition(item, product) ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        const product = action.payload;
        return [...state, { ...product, quantity: 1 }];
      }
      break;
    case REMOVE_FROM_CART:
      const itemToBeRemoved = action.payload;
      const isExistInCart = state.find((item) => condition(item, itemToBeRemoved));

      if (isExistInCart.quantity === 1) {
        debugger;
        return state.filter(
          (item) =>
            item.product.id !== isExistInCart.product.id ||
            item.variants.id !== isExistInCart.variants.id ||
            !arraysEqual(item.variants.selectableOptions, isExistInCart.variants.selectableOptions),
        );
      } else {
        return state.map((item) =>
          condition(item, itemToBeRemoved) ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }

    default:
      return state;
  }
};
export default cartReducer;
