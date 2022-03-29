const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/dataBase')
const Pergunta = require('./database/Pergunta')

//database
connection
    .authenticate()
    .then(()=> {
        console.log('conexão feita com o banco de dados!')
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

// Estou dizendo para o express usar o EJS como ENGINE (renderizador de HTML)
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Body parser (Lib para tratar os dados do formulário)
app.use(bodyParser.urlencoded({extended: false})) // decodifica os dados
app.use(bodyParser.json()) // será util para API mas já está configurado

// Rotas
// Estou criando uma variavel 'perguntas' para mostrar as perguntas que vem do formulario, ai eu pesquiso por elas na rota e a lista é mandada para a variavel.
app.get('/', (req, res) => {
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC'] // ASC = Crescente e DESC = Decrescente
    ]}).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        })
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

// Rota de Método POST é melhor para receber dados de forms (dado fica escondido)
// abaixo a var Pergunta que tem o Model armazenado recebe o METODO create para INSERIR a resposta do form no banco de dados
app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo; // body-parser disponibiliza o objeto BODY, que atualmente está captando o name dos forms no html
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
}) // caso esse INSERT for bem sucedido, o .redirect (palavra reservada do express) direciona o usuario para a home do site

app.get('/pergunta/:id',(req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // pergunta encontrada
            res.render('pergunta', {
                pergunta: pergunta
                })
        }else{ // não encontrada
            res.redirect('/')
        }
    })
})
app.listen(3000, () => {console.log('App rodando!')})
