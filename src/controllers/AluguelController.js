const connection = require('../database/connection')

module.exports = {

    async cadastro(req, res) {
        try {
            const cliente_id = req.headers.autorizacao
            const { carro_id } = req.params
            const { dias, retirada_carro } = req.body

            const verifica_carro = await connection('carro')
                .where({ esta_deletado: false })
                .andWhere({ reserva_id: cliente_id })
                .andWhere({alugado: false})
                .andWhere('id', carro_id)
                .select('modelo')
                .first()

            if (!verifica_carro) {
                return res.status(400).json({ Erro: 'Carro não existe ou não está reservado para você ou já foi alugado.' })
            } else if (Number.isInteger(dias) == true && dias > 0 && retirada_carro != null) {
                const carro_aluguel = await connection('carro')
                    .where({ esta_deletado: false })
                    .andWhere('carro.id', carro_id)
                    .join('categoria', 'categoria.id', '=', 'carro.categoria_id')
                    .select('categoria.preco_aluguel')
                    .first()

                const total = dias * carro_aluguel.preco_aluguel

                await connection('aluguel').insert({
                    cliente_id,
                    carro_id,
                    dias,
                    retirada_carro,
                    total
                })

                await connection('carro')
                    .where({ esta_deletado: false })
                    .andWhere('carro.id', carro_id)
                    .select('modelo')
                    .update({ alugado: true })

                return res.status(201).json({ Mensagem: 'Carro alugado com sucesso.' })
            } else {
                return res.status(400).json({ Erro: 'Informações preenchidas erradas.' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: 'Erro ao alugar carro.'
            })
        }

    }
}