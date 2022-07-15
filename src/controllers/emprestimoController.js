import {sequelize} from "../config/config";
import Emprestimo from "../models/Emprestimo";
import EmprestimoLivro from "../models/EmprestimoLivro";
import Livro from "../models/Livro";

const getAll = async (req, res) => {
  try {
    const emprestimos = await EmprestimoLivro.findAll({
    });
    return res.status(200).send(emprestimos);
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const getById = async (req, res) => {
  try {
    let { id } = req.params;

    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        message: 'Informe um id válido para consulta'
      });
    }

    let emprestimo = await Emprestimo.findOne({
      where: {
        id
      }
    });

    if (!emprestimo) {
      return res.status(400).send({
        message: `Não foi encontrado emprestimo com o id ${id}`
      });
    }

    return res.status(200).send(emprestimo);
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const persistir = async (req, res) => {
  try {
    let { id, prazo, devolucao, idUsuario, livros } = req.body;
    console.log(idUsuario);
    id = id ? id.toString().replace(/\D/g, '') : null;
    
    if(!prazo || !idUsuario || !livros ){
      return res.status(400).send({
        message: `Informe prazo, idUsuario e livros para cadastrar um emprestimo`
      })
    } 
    let idEmprestimo = 0;
    //create
    if(!id){
      let emprestimo = await Emprestimo.create({
        prazo, 
        idUsuario
      })
      idEmprestimo = emprestimo.id;
      for (let index = 0; index < livros.length; index++) {
        
        let livroExistente = await Livro.findOne({
          where: {
            id: livros[index]
          }
        })

        if(!livroExistente) {
          await emprestimo.destroy();
          return res.status(400).send({
            message: `O livro id ${livros[index]} não existe. o emprestimo nao foi salvo!`
          });
        }

        let livroEmprestado = await sequelize.query(`
        select
          id_emprestimo as id
        from emprestimo_livros as el
        inner join emprestimos as e on (e.id = el.id_emprestimo)
        where e.devolucao is null and el.id_livro = ${livros[index]}
        `)

        if(livroEmprestado[1].rowCount){
          await emprestimo.destroy();
          livroEmprestado = livroEmprestado[0][0] ? livroEmprestado[0][0].id : '';
          return res.status(400).send({
            message: `O livro id ${livros[index]} já está emprestado no empréstimo ${livroEmprestado}. O empréstimo não foi salvo!!`
          })
        }

        await EmprestimoLivro.create({
          idEmprestimo: emprestimo.id,
          idLivro: livros[index]
        });

      }
      let emprestimoLivros = EmprestimoLivro.findAll({
        where:{
          idEmprestimo
        }

      })
      return res.status(201).send({
        message: `Novo emprestimo cadastrado com sucesso`,
        data: { emprestimo, emprestimoLivros }
      })

    }
    


    //update
    let emprestimo = await Emprestimo.findOne({
      where: {
        idEmprestimo
      }
    });

    if(!emprestimo){
      return res.status(400).send({
        message:`Nao existe um emprestimo com o id ${id} para ser atualizado`
      })
    }

    let dados = req.body
    Object.keys(dados).forEach(campo => emprestimo[campo] = dados[campo] )

    await emprestimo.save();

    return res.status(201).send({
      message: `Emprestimo atualizado com sucesso`,
      date: emprestimo
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
        message: `id invalido, informe o id do emprestimo que deseja deletar`
      })
    }

    let emprestimo = await Livro.findOne({
      where: {
        id
      }
    })

    if(!emprestimo){
      return res.status(400).send({
        message: `Não existe um empre cadastrado com o id ${id}`
      })
    }

    await emprestimo.destroy();
    return res.status(200).send({
      message: `Emprestimo id ${id} deletado com sucesso`
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
}

export default {
  getAll,
  getById,
  persistir,
  deletar
};