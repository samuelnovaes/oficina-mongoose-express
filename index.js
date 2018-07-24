const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('static'))
app.use('/api', router)

//Rotas
router.use('/livros', require('./routes/livros'))

//Conexão com o banco de dados
mongoose.connect('mongodb://teste:teste123@ds217131.mlab.com:17131/books-app', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
	console.error('Erro ao se conectar ao banco de dados!')
})

//Ao se conectar, iniciar o servidor
db.on('open', () => {
	app.listen(8080, () => {
		console.log('Servidor rodando na porta 8080')
	})
})
