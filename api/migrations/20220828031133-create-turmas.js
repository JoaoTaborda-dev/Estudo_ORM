'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Turmas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_inicio: {
        type: Sequelize.DATEONLY
      },
      docente_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        References: { model: 'Pessoas', key: 'id' }
      },
      nivel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        References: { model: 'Niveis', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Turmas')
  }
}
