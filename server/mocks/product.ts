import { Product, SelectionOption, Variant } from '../types/product';
import { apply, pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';
import f from '@faker-js/faker';

const range = (min: number) => (max: number) =>
  Array.from({ length: max - min + 1 }, (_, idx) => idx + min);

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const randomPicture = () => `https://picsum.photos/id/${randomInt(1, 100)}/200`;

const randomImages = () =>
  pipe(
    randomInt(0, 10),
    range,
    apply(10),
    A.map((_) => randomPicture()),
  );

type RandomVariant = {
  isDiscontinued: boolean;
  selectableOptions: SelectionOption[];
};
const randomVariant = ({ isDiscontinued, selectableOptions }: RandomVariant): Variant => ({
  id: f.datatype.uuid(),
  quantity: f.datatype.number({ max: 10 }),
  image: randomPicture(),
  isDiscontinued,
  priceCents: f.datatype.number({ max: 20000, precision: 1 }),
  selectableOptions,
});

type RandomProduct = {
  isDiscontinued: boolean;
  variants: Variant[];
};
const randomProduct = ({ isDiscontinued, variants }: RandomProduct): Product => ({
  id: f.datatype.uuid(),
  name: f.commerce.productName(),
  isDiscontinued,
  variants,
  description: f.commerce.productDescription(),
  defaultImage: randomPicture(),
});

export const createRandomProduct = (
  isProductDiscontinued: boolean,
  variants: [boolean, string[]][],
) =>
  randomProduct({
    isDiscontinued: isProductDiscontinued,
    variants: variants.map(([isVariantDiscontinued, options]) =>
      randomVariant({
        isDiscontinued: isVariantDiscontinued,
        selectableOptions: options.map((options) => {
          const [type, value] = options.split(':');
          return { type, value };
        }),
      }),
    ),
  });

const mockedProducts = [
  createRandomProduct(false, [[false, ['size:S']]]),
  createRandomProduct(true, [[false, ['material:Metal', 'size:S']]]),
  createRandomProduct(false, [[true, ['material:Metal']]]),
  createRandomProduct(false, [
    [false, ['color:red', 'size:S']],
    [false, ['color:blue', 'size:M']],
    [true, ['color:blue', 'size:XL']],
  ]),
  createRandomProduct(false, [[false, ['color:yellow']]]),
  createRandomProduct(true, [[true, ['color:red']]]),
  createRandomProduct(true, [[false, ['material:Metal']]]),
  createRandomProduct(false, [
    [false, ['size:s', 'material:Metal']],
    [false, ['size:l', 'material:Concrete']],
  ]),
  createRandomProduct(true, [
    [false, ['color:red', 'size:S']],
    [false, ['color:blue', 'size:M']],
    [true, ['color:blue', 'size:XL']],
  ]),
  createRandomProduct(false, [
    [false, ['color:blue']],
    [true, ['color:red']],
  ]),
  createRandomProduct(false, [[false, ['color:blue']]]),
  createRandomProduct(false, [
    [true, ['color:blue', 'material:gold']],
    [false, ['color:red', 'material:bronze']],
  ]),
  createRandomProduct(true, [[false, ['color:blue']]]),
  createRandomProduct(false, [[false, ['color:red']]]),
  createRandomProduct(false, [[false, ['color:blue']]]),
  createRandomProduct(true, [[false, ['color:blue']]]),
  createRandomProduct(true, [[false, ['color:yellow']]]),
  createRandomProduct(false, [
    [true, ['color:blue', 'size:S']],
    [false, ['color:red', 'size:S']],
  ]),
  createRandomProduct(true, [[false, ['color:blue']]]),
  createRandomProduct(false, [[false, ['color:blue']]]),
  createRandomProduct(false, [[false, ['color:green']]]),
  createRandomProduct(false, [
    [true, ['color:blue', 'size:XL']],
    [false, ['color:red', 'size:M']],
  ]),
  createRandomProduct(false, [[true, ['color:blue']]]),
  createRandomProduct(true, [[false, ['color:brown']]]),
  createRandomProduct(false, [
    [true, ['color:blue', 'size:XL']],
    [false, ['color:red', 'size:M']],
    [false, ['color:yellow', 'size:M']],
    [false, ['color:green', 'size:L']],
  ]),
  createRandomProduct(false, [[true, ['color:blue']]]),
  createRandomProduct(false, [[false, ['color:blue']]]),
];

export default mockedProducts;
