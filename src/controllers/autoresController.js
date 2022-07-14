import Autor from "../models/Autor";

const getAutores = async (req, res) => {
  try {
    let { id } = req.params;
  
    // garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    
    if(!id){
      let autores = await Autor.findAll();
      
      if(!autores.length){
        return res.status(400).send({
          msg: `Ainda não existem autores cadastrados`
        })
      }
      return res.status(200).send({
        msg: `Autores importados de nosso banco de dados`,
        data: {autores}
      })
    }

    let autor = await Autor.findOne( {
      where: {
        id: id
      }
    } )
    if(!autor){
      return res.status(400).send({
        message: `Nao existe um autor com o id ${id}`
      })
    }
    return res.status(200).send({
      message:`Autor id ${id}`,
      data: {autor}
    })
    
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }

}

const persistir = async (req, res) => {
  try {
    let { id } = req.body;
    const { nome, email } = req.body;
    id = id ? id.toString().replace(/\D/g, '') : null;
    
    if(!nome || !email){
      return res.status(400).send({
        message: `Informe Nome e email do autor`
      })
    } 

    //create
    if(!id){

      let existe = await Autor.findOne({
        where: {
          email
        }
      })

      if(existe){
        return res.status(400).send({
          message: `ja existe um autor cadastrado com esse email`
        })
      }

      let autor = await Autor.create({
        nome: nome,
        email: email
      })

      return res.status(201).send({
        message: `Novo autor cadastrado com sucesso`,
        data: { autor }
      })

    }
    


    //update
    let autor = await Autor.findOne({
      where: {
        id
      }
    });

    if(!autor){
      return res.status(400).send({
        message:`Nao existe um autor com o id ${id} para ser atualizado`
      })
    }
    let dados = req.body
    Object.keys(dados).forEach(campo => autor[campo] = dados[campo] )

    await autor.save();
    return res.status(201).send({
      message: `autor atualizado com sucesso`,
      date: autor
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
        message: `id invalido, informe o id do autor que deseja deletar`
      })
    }

    let autor = await Autor.findOne({
      where: {
        id
      }
    })

    if(!autor){
      return res.status(400).send({
        message: `Não existe um autor cadastrado com o id ${id}`
      });
    }

    await autor.destroy();
    return res.status(200).send({
      message: `Autor id ${id} deletado com sucesso`
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
}

export default {
  getAutores,
  persistir,
  deletar
};