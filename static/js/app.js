const vm = new Vue({
	el: '#app',
	data: {
		livros: [],
		loading: false,
		dialogAdd: false,
		dialogEdit: false,
		addTitulo: null,
		addAutor: null,
		addAno: null,
		addDescricao: null,
		editTitulo: null,
		editAutor: null,
		editAno: null,
		editDescricao: null,
		editLivro: null,
		busca: null
	},
	mounted() {
		this.loading = true
		this.refresh()
	},
	methods: {
		refresh(search) {
			axios.get(`/api/livros`, {
				params: {
					titulo: search
				}
			}).then(response => {
				this.livros = response.data
			}).catch(err => {
				alert(err.response.data)
			}).finally(() => {
				this.loading = false
			})
		},
		insert() {
			this.loading = true
			axios.post('/api/livros', {
				titulo: this.addTitulo,
				autor: this.addAutor,
				ano: this.addAno,
				descricao: this.addDescricao
			}).then(() => {
				this.refresh()
			}).catch(err => {
				alert(err.response.data)
				this.loading = false
			}).finally(() => {
				this.dialogAdd = false
			})
		},
		update() {
			this.loading = true
			axios.put(`/api/livros/${this.editLivro._id}`, {
				titulo: this.editTitulo,
				autor: this.editAutor,
				ano: this.editAno,
				descricao: this.editDescricao
			}).then(() => {
				this.refresh()
			}).catch(err => {
				alert(err.response.data)
				this.loading = false
			}).finally(() => {
				this.dialogEdit = false
			})
		},
		remove(id) {
			this.loading = true
			axios.delete(`/api/livros/${id}`).then(() => {
				this.refresh()
			}).catch(err => {
				alert(err.response.data)
				this.loading = false
			})
		},
		openDialogAdd() {
			this.addTitulo = null
			this.addAutor = null
			this.addAno = null
			this.addDescricao = null
			this.dialogAdd = true
		},
		openDialogEdit(id) {
			this.editLivro = this.livros.find(livro => livro._id == id)
			this.editTitulo = this.editLivro.titulo
			this.editAutor = this.editLivro.autor
			this.editAno = this.editLivro.ano
			this.editDescricao = this.editLivro.descricao
			this.dialogEdit = true
		}
	},
	computed: {
		anoMaximo() {
			return new Date().getFullYear()
		}
	},
	watch: {
		busca() {
			this.loading = true
			this.refresh(this.busca)
		}
	}
})