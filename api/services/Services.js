const database = require('../models')

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll()
    }

    async pegaPorId(id){
        return datatabase[this.nomeDoModelo].findOne({where: {id: Number(id)}})
    }
}

module.exports = Services