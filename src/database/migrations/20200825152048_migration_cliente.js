exports.up = function (knex) {
    return knex.schema.createTable('cliente', function (table) {
        table.increments('id').primary()
        table.string('nome', 255).notNullable()
        table.string('cpf', 11).unique().notNullable()
        table.string('cod_acesso').notNullable()
        table.string('email', 255).unique().notNullable()
        table.integer('telefone', 9).notNullable()
        table.date('data_nascimento').notNullable()

        table.dateTime('criado_em').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('atualizado_em').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.boolean('esta_deletado').default(false)
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('cliente')
}
