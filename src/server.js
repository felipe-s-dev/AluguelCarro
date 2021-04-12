const express = require('express')
const routes = require('./routes/index')
require('dotenv/config')

const cors = require('cors')

const app = express()

const { PORT } = process.env

app.use(cors())

app.use(express.json())

app.use(routes)

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))