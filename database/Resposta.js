const Sequelize = require('sequelize')// importando Sequelize 
const connection = require('./dataBase')// importando o banco de dados

// Model de resposta
const Resposta = connection.define('respostas',{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    } 
})

Resposta.sync({force: false})

module.exports = Resposta