import { Response, Request } from 'express';
import products from '../mocks/product';

export const getProducts = (_req: Request, res: Response) => {
  res.json({ products });
};
