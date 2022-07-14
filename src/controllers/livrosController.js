import Livro from "../models/Livro";

const getLivros = async (req, res) => {
  try {
    let { id } = req.params;
  
    // garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;

    //getAll
    if(!id){
      let livros = await Livro.findAll({ include: ['autor', 'categoria'] });
      
      if(!livros.length){
        return res.status(400).send({
          msg: `Ainda não existem livros cadastrados`
        })
      }

      return res.status(200).send({
        msg: `Livros importados de nosso banco de dados`,
        data: {livros}
      })

    }

    //getById
    let livro = await Livro.findOne( {
      where: {
        id: id},
      include: ['autor', 'categoria'],
    } )

    if(!livro){
      return res.status(400).send({
        message: `Nao existe um livro com o id ${id}`
      })
    }

    return res.status(200).send({
      message:`Livro id ${id}`,
      data: {livro}
    })
    
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }

}

// titulo
//   * sinopse
//   * emprestado (boolean)
//   * idCategoria BelongsTo(Categorias)
//   * idAutor
const persistir = async (req, res) => {
  try {
    let { id } = req.body;
    const { titulo, sinopse, emprestado, idCategoria, idAutor } = req.body;
    id = id ? id.toString().replace(/\D/g, '') : null;
    
    if(!titulo || !sinopse || !idCategoria || !idAutor ){
      return res.status(400).send({
        message: `Informe titulo, sinopse, idCategoria e idAutor do livro`
      })
    } 

    //create
    if(!id){

      let livro = await Livro.create({
        titulo, sinopse, idCategoria, idAutor
      })

      return res.status(201).send({
        message: `Novo Livro cadastrado com sucesso`,
        data: { livro }
      })

    }
    


    //update
    let livro = await Livro.findOne({
      where: {
        id
      }
    });

    if(!livro){
      return res.status(400).send({
        message:`Nao existe um livro com o id ${id} para ser atualizado`
      })
    }

    let dados = req.body
    Object.keys(dados).forEach(campo => livro[campo] = dados[campo] )

    await livro.save();

    return res.status(201).send({
      message: `Livro atualizado com sucesso`,
      date: livro
    })
    
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const deletar = async (req, res) => {
  try {
    let { id } = req.body;
    id = id ? id.toString().replace(/\D/g, '') : null;

    if( !id ) {
      return res.status(400).send({
        message: `id invalido, informe o id do livro que deseja deletar`
      })
    }

    let livro = await Livro.findOne({
      where: {
        id
      }
    })

    if(!livro){
      return res.status(400).send({
        message: `Não existe um Livro cadastrado com o id ${id}`
      })
    }

    await livro.destroy();
    return res.status(200).send({
      message: `Livro id ${id} deletado com sucesso`
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
}

export default {
  getLivros,
  persistir,
  deletar
};