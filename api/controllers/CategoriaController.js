// const database = require('../models')

const Services = require('../services/Services')
const categoriasServices = new Services('Categorias')

class CategoriaController {
  //Busca de todos os niveis
  static async pegaTodosOscategorias(req, res) {
    try {
      const todosOsNiveis = await categoriasServices.pegaTodosOsRegistros()
      return res.status(200).json(todosOsNiveis)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Busca de nivel por id
  static async pegaUmCategoria(req, res) {
    const { id } = req.params
    try {
      const umNivel = await database.Niveis.findOne({
        where: {
          id: Number(id)
        }
      })
      return res.status(200).json(umNivel)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Criação de Registro Nivel
  static async criaNivel(req, res) {
    const novoNivel = req.body
    try {
      const novoNivelCriado = await database.Niveis.create(novoNivel)
      return res.status(200).json(novoNivelCriado)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Atualizar um registro
  static async atualizarNivel(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await database.Niveis.update(novasInfos, { where: { id: Number(id) } })
      const nivelAtualizado = await database.Niveis.findOne({
        where: {
          id: Number(id)
        }
      })
      return res.status(200).json(nivelAtualizado)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Deletar um Registro
  static async apagaNivel(req, res) {
    const { id } = req.params

    try {
      await database.Niveis.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `id ${id} deletado!` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = CategoriaController
