import Usuario from "../models/Usuario";

const getUsuarios = async (req, res) => {
  try {
    let { id } = req.params;
  
    // garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    
    //getAll
    if(!id){
      let usuario = await Usuario.findAll();
      
      if(!usuario.length){
        return res.status(400).send({
          msg: `Ainda não existem usuarios cadastrados`
        })
      }
      return res.status(200).send({
        msg: `Usuarios importados de nosso banco de dados`,
        data: {usuario}
      })
    }

    //getById
    let usuario = await Usuario.findOne( {
      where: {
        id
      }
    } )
    if(!usuario){
      return res.status(400).send({
        message: `Nao existe um usuario com o id ${id}`
      })
    }
    return res.status(200).send({
      message:`Usuario id ${id}`,
      data: {usuario}
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
    const { nome, cpf_cnpj, email, telefone} = req.body;
    id = id ? id.toString().replace(/\D/g, '') : null;
    
    if(!nome || !cpf_cnpj || !email || !telefone){
      return res.status(400).send({
        message: `Informe nome, cpf_cnpj, email e telefone do usuario`
      })
    } 

    //create
    if(!id){

      let existe = await Usuario.findOne({
        where: {
          cpf_cnpj
        }
      })

      if(existe){
        return res.status(400).send({
          message: `ja existe um usuario cadastrado com esse cpf_cnpj`
        })
      }

      let usuario = await Usuario.create({
        nome, cpf_cnpj, email, telefone
      })

      return res.status(201).send({
        message: `Novo usuario cadastrado com sucesso`,
        data: { usuario }
      })

    }
    


    //update
    let usuario = await Usuario.findOne({
      where: {
        id
      }
    });

    if(!usuario){
      return res.status(400).send({
        message:`Nao existe um usuario com o id ${id} para ser atualizado`
      })
    }
    id = id ? id.toString().replace(/\D/g, '') : null;

    let dados = req.body
    Object.keys(dados).forEach(campo => usuario[campo] = dados[campo] )

    await usuario.save();

    return res.status(201).send({
      message: `usuario atualizado com sucesso`,
      date: usuario
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
        message: `id invalido, informe o id do usuario que deseja deletar`
      })
    }

    let usuario = await Usuario.findOne({
      where: {
        id
      }
    })

    if(!usuario){
      return res.status(400).send({
        message: `Não existe um usuario cadastrado com o id ${id}`
      })
    }

    await usuario.destroy();
    return res.status(200).send({
      message: `Usuario id ${id} deletado com sucesso`
    })

  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
}

export default {
  getUsuarios,
  persistir,
  deletar
};