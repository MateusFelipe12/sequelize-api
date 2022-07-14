# Sistema de Biblioteca

___

## Models

* Categorias
  * id
  * nome

* Autores
  * id
  * nome
  * email

* Livros
  * id
  * titulo
  * sinopse
  * emprestado (boolean)
  * id_categoria BelongsTo(Categorias)
  * id_autor BelongsTo(Autores)

* Usuarios
  * id
  * nome
  * cpfcnpj
  * email
  * telefone

*emprestimo
  * id
  * id_usuario
  * prazo date
  * devolucao DATE
  * aberto BOOLEAN default