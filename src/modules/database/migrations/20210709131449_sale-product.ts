import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('SaleProduct', table => {
    table.increments('id').primary();
    table
      .integer('saleId')
      .notNullable()
      .references('id')
      .inTable('Sale')
      .onDelete('CASCADE');
    table
      .integer('productId')
      .notNullable()
      .references('id')
      .inTable('Product')
      .onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('SaleProduct');
}
