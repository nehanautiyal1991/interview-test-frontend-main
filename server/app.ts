import express from 'express';
import cors from 'cors';

import * as products from './routes/products';

const PORT = 8000;
const app = express();

app.use(cors());

// Pretty json output
app.set('json spaces', 2);

// API
app.get('/products', products.getProducts);

app.listen({ port: PORT }, () => {
  console.log(`server running on port: ${PORT}`);
});
