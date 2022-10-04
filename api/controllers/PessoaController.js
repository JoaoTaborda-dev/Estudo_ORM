const database = require('../models')
const Sequelize = require('sequelize')

class PessoaController {
  // Busca todos os Registros ativos
  static async pegaTodasAsPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await database.Pessoas.findAll()
      return res.status(200).json(pessoasAtivas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  // Busca todos os Registros
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.scope('todos').findAll()
      return res.status(200).json(todasAsPessoas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Busca Pessoa por Id
  static async pegaUmaPessoa(req, res) {
    const { id } = req.params
    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: {
          id: Number(id)
        }
      })
      return res.status(200).json(umaPessoa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  // Criação de Registro
  static async criaPessoa(req, res) {
    const novaPessoa = req.body
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
      return res.status(200).json(novaPessoaCriada)
      // if (typeof req.body.email == 'string') {
      //   const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
      //   return res.status(200).json(novaPessoaCriada)
      // }
      // return res.status(400).json({
      //   mensagem: `O valor passado no campo email está incorreto, favor informar novamente!`
      // })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Atualizar um registro
  static async atualizarPessoa(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await database.Pessoas.update(novasInfos, { where: { id: Number(id) } })
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: {
          id: Number(id)
        }
      })
      return res.status(200).json(pessoaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Deletar um Registro
  static async apagaPessoa(req, res) {
    const { id } = req.params

    try {
      await database.Pessoas.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `id ${id} deletado!` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Restaura registro
  static async restauraPessoa(req, res) {
    const { id } = req.params

    try {
      await database.Pessoas.restore({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `id ${id} restaurado!` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  // Pega uma Matricula (Modelo convencional, o qual eu fiz antes de assistir a aula)
  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_Id: Number(estudanteId)
        }
      })
      return res.status(200).json(umaMatricula)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  // Pega uma Matricula
  static async pegaMatriculaConfirmada(req, res) {
    const { estudanteId } = req.params
    try {
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(estudanteId) }
      })
      const matriculas = await pessoa.getAulasMatriculadas()
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params
    try {
      const todasAsMatriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(turmaId),
          status: 'confirmado'
        },
        limit: 20,
        order: [['estudante_id', 'DESC']]
      })
      return res.status(200).json(todasAsMatriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaTurmasLotadas(req, res) {
    const lotacaoTurma = 2
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: 'confirmado'
        },
        attributes: ['turma_id'],
        group: ['turma_id'],
        having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
      })
      return res.status(200).json(turmasLotadas.count)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Cancela Matricula de Usuario
  static async cancelaPessoa(req, res) {
    const {estudanteId} =  req.params
    try {
      database.sequelize.transaction(async transacao => {
        await database.Pessoas
        .update(
          {ativo: false},
          {
            where:
            {id: Number(estudanteId)}
          },
          {
            transaction: transacao
          }
        )
      await database.Matriculas
        .update(
          {status: 'cancelado'},
          {
            where:
            {estudante_id: Number(estudanteId) }
          },
          {
            transaction: transacao
          }
        )
      })

      return res.status(200).json({ message: `Matriculas referente ao ${estudanteId} canceladas`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  // Restaura Matricula de Usuario
  static async restauraMatriculaPessoa(req, res) {
    const {estudanteId} =  req.params
    try {
      database.sequelize.transaction( async transacao => {
        await database.Pessoas
        .scope('todos')
        .update(
          {ativo: true},
          {
            where:
            {id: Number(estudanteId)}
          },
          {transaction: transacao}
        )
      await database.Matriculas
        .update(
          {status: 'confirmado'},
          {
            where:
            {estudante_id: Number(estudanteId)}
          },
          {transaction: transacao}
        )
      })
      return res.status(200).json({ message: `Matriculas referente ao ${estudanteId} restauradas`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }



  // // Pega uma Matricula (Modelo convencional, o qual eu fiz antes de assistir a aula)
  // static async pegaMatriculaConfirmada(req, res) {
  //   const { estudanteId } = req.params
  //   try {
  //     const matriculasConfirmadas = await database.Matriculas.findAll({
  //       where: {
  //         estudante_Id: Number(estudanteId),
  //         status: String('confirmado')
  //       }
  //     })
  //     return res.status(200).json(matriculasConfirmadas)
  //   } catch (error) {
  //     return res.status(500).json(error.message)
  //   }
  // }

  // Cria Matricula
  static async criaMatricula(req, res) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      )
      return res.status(200).json(novaMatriculaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Atualiza Matricula
  static async atualizarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    const novasInfos = req.body
    try {
      await database.Matriculas.update(novasInfos, {
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) }
      })
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId)
        }
      })
      return res.status(200).json(matriculaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Deletar uma Matricula
  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params

    try {
      await database.Matriculas.destroy({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) }
      })
      return res.status(200).json({ mensagem: `id ${matriculaId} deletado!` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PessoaController
