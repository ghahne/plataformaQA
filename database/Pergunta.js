const Sequelize = require('sequelize')// importando Sequelize 
const connection = require('./dataBase')// importando o banco de dados

// criando uma tabela utilizando Sequelize no meu banco de dados
// um model é uma representação do seu banco de dados no seu código JS
// sequelize serve para a criação desses models
const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// se não existir ESSA tabela no meu banco ele irá criar e se ja existir ele não forçara a criação dela (duplicando)
Pergunta.sync({force:false}).then (() => {
    console.log('Tabela criada')
})

module.exports = Pergunta