const { Router } = require('express')

const ClienteController = require('../controllers/ClienteController')
const SessaoController = require('../controllers/SessaoController')
const CarroController = require('../controllers/CarroController')
const PerfilController = require('../controllers/PerfilController')
const AluguelController = require('../controllers/AluguelController')

const routes = Router()

routes.get('/cliente', ClienteController.lista)
routes.post('/cliente', ClienteController.cadastro)

routes.post('/sessoes', SessaoController.login)

routes.get('/perfil', PerfilController.listagemReserva)

routes.get('/carro', CarroController.listagem)
routes.get('/carro/:id', CarroController.listagemUnica)
routes.get('/carro/aluguel/:id', CarroController.valorAluguel)
routes.put('/carro/reserva/:id', CarroController.reservaCarro)
routes.put('/carro/delete/:id', CarroController.delete)

routes.post('/aluguel/:carro_id', AluguelController.cadastro)



module.exports = routes

