const connection = require('../database/connection')

module.exports = {
    async login(req, res) {
        try {
            const { cpf, cod_acesso } = req.body

            const cliente = await connection('cliente')
                .where({ esta_deletado: false })
                .andWhere('cpf', cpf)
                .andWhere('cod_acesso', cod_acesso)
                .select('nome')
                .first()

            if (!cliente) {
                return res.status(400).json({ Erro: 'Dados informados errados ou não existentes.' })
            } else {
                return res.status(200).json(cliente)
            }

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: 'Erro ao logar no sistema.'
            })
        }
    }
}