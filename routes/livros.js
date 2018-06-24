const router = require('express').Router()
const Livros = require('../models/livros')

router.get('/', (req, res) => {
	const busca = new RegExp(req.query.busca, 'i')
	Livros.find().or([
		{ titulo: busca },
		{ autor: busca },
		{ descricao: busca }
	]).sort({ _id: -1 }).exec((err, livros) => {
		if (err) res.status(500).send(err.message)
		else res.json(livros)
	})
})

router.get('/:id', (req, res) => {
	Livros.findById(req.params.id, (err, livro) => {
		if (err) res.status(500).send(err.message)
		else res.json(livro)
	})
})

router.post('/', (req, res) => {
	Livros.create(req.body, (err, livro) => {
		if (err) res.status(500).send(err.message)
		else res.json(livro)
	})
})

router.put('/:id', (req, res) => {
	Livros.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, (err, livro) => {
		if (err) res.status(500).send(err.message)
		else res.json(livro)
	})
})

router.delete('/:id', (req, res) => {
	Livros.findByIdAndRemove(req.params.id, (err, livro) => {
		if (err) res.status(500).send(err.message)
		else res.json(livro)
	})
})

module.exports = router