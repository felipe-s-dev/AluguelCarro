exports.up = function (knex) {
    return knex.schema.createTable('carro', function (table) {
        table.increments('id').primary()
        table.string('modelo', 200).notNullable()
        table.string('placa', 7).unique().notNullable()
        table.string('cor', 50).notNullable()
        table.string('observacoes', 255)
        table.boolean('alugado').default(false)

        table.integer('categoria_id').unsigned().notNullable()
        table.integer('reserva_id').unsigned().default(null)

        table.dateTime('criado_em').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('atualizado_em').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.boolean('esta_deletado').default(false);

        table.foreign('categoria_id').references('id').inTable('categoria')
        table.foreign('reserva_id').references('id').inTable('cliente')
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('carro')
}