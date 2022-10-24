const database = require('../models')

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo
  }

  async pegaTodosOsRegistros() {
    return database[this.nomeDoModelo].findAll()
  }

  async pegaPorId(id) {
    return database[this.nomeDoModelo].findOne({ where: { id: Number(id) } })
  }

  async pegaUmRegistro(id) {}

  async criaRegistro(dadosCriacao) {
    return database[this.nomeDoModelo].create(dadosCriacao)
  }

  async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
    return database[this.nomeDoModelo].update(
      dadosAtualizados,
      { where: { id: id } },
      transacao
    )
  }

  async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
    return database[this.nomeDoModelo].update(
      dadosAtualizados,
      { where: { ...where } },
      transacao
    )
  }

  async apagaRegistro(id) {}
}

module.exports = Services
