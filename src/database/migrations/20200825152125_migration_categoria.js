exports.up = function (knex) {
    return knex.schema.createTable('categoria', function (table) {
        table.increments('id').primary()
        table.string('nome', 100).notNullable()
        table.decimal('preco_aluguel').notNullable()

        table.dateTime('criado_em').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('atualizado_em').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('categoria')
}
