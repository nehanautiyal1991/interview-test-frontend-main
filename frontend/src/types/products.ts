export type SelectionOption = {
  type: string;
  value: string;
};
export type IVariant = {
  id: string;
  quantity: number;
  image: string;
  isDiscontinued: boolean;
  priceCents: number;
  selectableOptions: SelectionOption[];
};

export interface IProductItem {
  id: string;
  name: string;
  description: string;
  defaultImage: string;
  quantity: number;
  isDiscontinued: boolean;
  variants: IVariant[];
}

export interface ICartItem {
  product: IProductItem;
  variants: IVariant;
  quantity: number;
}
