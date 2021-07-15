import * as Knex from 'knex';
import { IS_DEV } from 'settings';

const arrayProducts = [
  {
    name: 'Coca cola',
    description: 'Coca cola tradicional de 2 litros',
    price: 5.0
  },
  {
    name: 'Bola de basquete',
    description: 'Bola de basquete, marca: wilson',
    price: 24.99
  },
  {
    name: 'Doritos',
    description: 'Doritos tradicional 96g',
    price: 30.99
  },
  {
    name: 'PlayStation 5',
    description: 'PlayStation 5',
    price: 6000.0
  }
];

export async function seed(knex: Knex): Promise<any> {
  if (!IS_DEV) return;

  const products = await knex
    .count()
    .from('Product')
    .first();

  if (Number(products.count) > 0) return;

  for (let x = 0; x < arrayProducts.length; x++) {
    const productParams = arrayProducts[x];
    const product = {
      ...productParams,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(product).into('Product');
  }
}
