const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('static'))
app.use('/api', router)

mongoose.connect('mongodb://teste:teste123@ds217131.mlab.com:17131/books-app')
const db = mongoose.connection

db.on('error', () => {
	console.error('Erro ao se conectar ao banco de dados!')
})

db.on('open', () => {
	app.listen(8080, () => {
		console.log('Servidor rodando na porta 8080')
	})
})

router.use('/livros', require('./routes/livros'))
