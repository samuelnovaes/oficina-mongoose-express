const mongoose = require('mongoose')

const livrosSchema = new mongoose.Schema({
	titulo: {
		type: String,
		required: true
	},
	autor: {
		type: String,
		required: true
	},
	ano: {
		type: Number,
		required: true,
		validate: {
			validator: ano => ano >= 1000 && ano <= new Date().getFullYear(),
			message: `{VALUE} não é um ano válido!`
		}
	},
	descricao: String
})

module.exports = mongoose.model('livros', livrosSchema)