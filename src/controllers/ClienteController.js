const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async lista(req, res) {
        try {
            const lista = await connection('cliente')
                .where({ esta_deletado: false })
                .select('*')

            if (lista.length === 0) {
                return res.json({ mensagem: 'Ainda não existe cadastros' })
            } else {
                return res.status(200).json(lista)
            }

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                error: 'Erro ao listar clientes'
            })
        }
    },

    async cadastro(req, res) {
        try {
            const { nome, cpf, email, telefone, data_nascimento } = req.body

            const cpf_existente = await connection('cliente')
                .where('cpf', cpf)
                .select('nome')
                .first()

            const email_existente = await connection('cliente')
                .where('email', email)
                .select('nome')
                .first()


            if (cpf_existente) {
                return res.status(400).json({ mensagem: 'Esse CPF ja existe em nosso sistema' })
            } else if (email_existente) {
                return res.status(400).json({ mensagem: 'Esse email ja existe em nosso sistema' })
            } else {
                const cod_acesso = crypto.randomBytes(6).toString('hex')

                await connection('cliente').insert({
                    nome,
                    cpf,
                    cod_acesso,
                    email,
                    telefone,
                    data_nascimento
                })
                return res.status(201).json({ Senha: cod_acesso })
            }

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                error: 'Erro ao registrar clientes'
            })
        }

    },

}