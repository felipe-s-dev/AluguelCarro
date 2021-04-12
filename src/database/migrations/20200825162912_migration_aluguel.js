exports.up = function (knex) {
  return knex.schema.createTable('aluguel', function (table) {
    table.increments('id').primary()
    table.integer('cliente_id').unsigned().notNullable()
    table.integer('carro_id').unsigned().notNullable()

    table.integer('dias').notNullable()
    table.date('retirada_carro').notNullable()
    table.decimal('total').notNullable()


    table.dateTime('criado_em').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('atualizado_em').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.boolean('esta_deletado').default(false);

    table.foreign('cliente_id').references('id').inTable('cliente')
    table.foreign('carro_id').references('id').inTable('carro')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('aluguel')
}
