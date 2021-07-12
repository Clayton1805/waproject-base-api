import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Sale', table => {
    table.increments('id').primary();
    table
      .integer('userId')
      .notNullable()
      .references('id')
      .inTable('User')
      .onDelete('CASCADE');
    table.string('status').notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('Sale');
}
