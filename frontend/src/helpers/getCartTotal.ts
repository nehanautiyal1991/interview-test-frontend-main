import { ICartItem } from '../types/products';

const getCartTotal = (items: ICartItem[]) => {
  return items.reduce((acc: number, item) => {
    acc += item.quantity;
    return acc;
  }, 0);
};
export { getCartTotal };
