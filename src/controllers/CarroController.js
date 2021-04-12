const connection = require('../database/connection')

module.exports = {

    async listagem(req, res) {
        try {
            const { pagina = 1 } = req.query

            const { filtro } = req.body

            const carros = await connection('carro')
                .where({ esta_deletado: false })
                .andWhere('carro.modelo', 'like', `${filtro}%`)
                .orderBy('carro.modelo', 'asc')
                .limit(3)
                .offset((pagina - 1) * 3)
                .join('categoria', 'categoria.id', '=', 'carro.categoria_id')
                .select([
                    'carro.modelo',
                    'carro.placa',
                    'carro.cor',
                    'carro.observacoes',
                    'carro.alugado',
                    'categoria.nome'
                ])

            if (carros.length === 0) {
                return res.status(400).json({ Mensagem: 'Nenhum carro registrado no sistema' })
            } else {
                return res.status(200).json(carros)
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                error: 'Erro ao listar carros.'
            })
        }

    },

    async listagemUnica(req, res) {
        try {
            const { id } = req.params

            const carro = await connection('carro')
                .where({ esta_deletado: false })
                .andWhere('carro.id', id)
                .join('categoria', 'categoria.id', '=', 'carro.categoria_id')
                .select([
                    'carro.modelo',
                    'carro.placa',
                    'carro.cor',
                    'carro.observacoes',
                    'carro.alugado',
                    'categoria.nome'
                ])
                .first()

            if (!carro) {
                return res.status(400).json({ Erro: 'Carro inexistente ou indisponivel.' })
            } else {
                return res.status(200).json(carro)
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: 'Erro ao listar o carro.'
            })
        }

    },

    async valorAluguel(req, res) {
        try {
            const { id } = req.params
            const { dias } = req.body

            const carro = await connection('carro')
                .where({ esta_deletado: false })
                .andWhere('id', id)
                .select('modelo')
                .first()

            if (!carro) {
                return res.status(400).json({ Erro: 'Carro Inexistente' })
            } else if (Number.isInteger(dias) == true ) {
                const carro_aluguel = await connection('carro')
                    .where({ esta_deletado: false })
                    .andWhere('carro.id', id)
                    .join('categoria', 'categoria.id', '=', 'carro.categoria_id')
                    .select('categoria.preco_aluguel')
                    .first()

                const total = dias * carro_aluguel.preco_aluguel

                return res.status(200).json({ Preco: total.toFixed(2)})
            }else{
                return res.status(400).json({Erro: 'Informações preenchidas erradas.'}) 
            }

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: 'Erro ao calcular..'
            })
        }

    },

    async reservaCarro(req, res) {
        try {
            const { id } = req.params
            const id_cliente = req.headers.autorizacao

            const carro = await connection('carro')
                .where({ esta_deletado: false })
                .andWhere({ reserva_id: null })
                .andWhere('id', id)
                .select('modelo')
                .first()

            if (!carro) {
                return res.status(400).json({ Erro: 'Carro inexistente ou reservado' })
            } else {
                await connection('carro')
                    .where({ esta_deletado: false })
                    .andWhere({ reserva_id: null })
                    .andWhere('id', id)
                    .select('modelo')
                    .update({ reserva_id: id_cliente })

                return res.status(200).json({ Mensagem: 'Carro reservado com sucesso.' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: 'Erro ao reservar.'
            })
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params

            const carro = await connection('carro')
                .where({ esta_deletado: false })
                .andWhere({ reserva_id: null })
                .andWhere('id', id)
                .select('modelo')
                .first()

            if (!carro) {
                return res.status(400).json({ Messagem: 'Carro não encontrado.' })
            } else {
                await connection('carro')
                    .where({ esta_deletado: false })
                    .andWhere({ reserva_id: null })
                    .andWhere('id', id)
                    .select('modelo')
                    .update({ esta_deletado: true })

                    return res.status(200).json({ Mensagem: 'Carro deletado com sucesso.' })
            }

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                error: 'Erro ao registrar clientes'
            })
        }

    }
}