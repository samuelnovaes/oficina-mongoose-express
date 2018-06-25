const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routerfy = require('routerfy')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('static'))
app.use('/api', routerfy('routes'))

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
