import controller from '../controllers/emprestimoController'

export default (app) => {
	app.post('/emprestimos/livro', controller.livroEmprestado);
	app.post('/emprestimo/deletar', controller.deletar);
	app.post('/emprestimos/livro/todos', controller.emprestimosLivro)
	app.get('/emprestimo', controller.getAll);
	app.get('/emprestimo/:id', controller.getById);
	app.post('/emprestimo', controller.persistir);
	app.post('/emprestimo/:id', controller.persistir);
}