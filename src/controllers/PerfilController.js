const connection = require('../database/connection')

module.exports = {

    async listagemReserva(req, res) {
        try {
            const cliente_id = req.headers.autorizacao

            const carros = await connection('carro')
            .where({esta_deletado: false})
            .andWhere({reserva_id: cliente_id})
            .join('categoria', 'categoria.id', '=', 'carro.categoria_id')
            .select([
                'carro.modelo',
                'carro.placa',
                'carro.cor',
                'carro.observacoes',
                'carro.alugado',
                'categoria.nome'
            ])

            if(carros.length === 0){
                return res.status(400).json({Erro: 'Ainda nao possui nenhum carro reservado.'})
            }else{
                return res.status(200).json(carros)
            }
    
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: 'Erro ao listar os carros.'
            })
        }
    }
}