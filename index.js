const express = require('express');

const app = express();
const axios = require('axios').default;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//MAPEAMENTO DA PASTA PUBLIC
app.use(express.static('public'));

//CONFIGURA O EJS COMO VIEW ENGINE (REDENRIZA AS PÁGINAS DE FRONT-END)
app.set('view engine', 'ejs');


//ROTA DE CADASTRO DE ARTES MARCIAL
app.get('/inserirArtesMarcial', (req, res)=>{
    res.render('artesMarcial/index');
});

//ROTA DE LISTAGEM DE CATEGORIAS
app.get('/listagemArtesMarcial', (req, res)=>{
    
    const urlListagemArtesMarcial = 'http://localhost:3000/listarArtes';

    /*
    CHAMADA PELO AXIOS:
    1 - URL DA ROTA (urlListagemArtesMarcial)
    2 - CALLBACK DA RESPOSTA DA CHAMADA
    */
    axios.get(urlListagemArtesMarcial)
        .then(
            (response)=>{
                // console.log(response.data);
                // res.send(response.data);
                let artesMarcial = response.data;
                res.render('artesMarcial/listagemArtesMarcial', {artesMarcial});

        }); 
    });

    //ROTA DE LISTAGEM DE EDIÇÃO
    app.get('/alterarArtesMarcial/:id', (req, res)=>{
        
        //RECEBE O ID DE CATEGORIA QUE VAI SER EDITADO
        let {id} = req.params;
        // console.log(id);

        //CHAMADA DO AXIOS PARA A API:
        const urlListagemCategoria = `http://localhost:3000/listarArtes/${id}`;
        
        axios.get(urlListagemCategoria)
        .then(
            (response)=>{

                let categoria = response.data;
                res.render('artesMarcial/editarArtes', {categoria});

            }
        )
    });

    app.get('/formEdicaoArtes/:id', (req, res)=>{

        let {id} = req.params
        console.log(id);

        

        res.render('artesMarcial/formEdicao');
        
    })

    //ROTA PARA DELETAR ESTILO MARCIAL
    app.post('/artesMarcial/alterarArtesMarcial', (req, res)=>{

        const urlExcluirArtes = 'http://localhost:3000//excluirArtesMarcial/{id}';
        console.log(req.body);

        axios.put(urlExcluirArtes, req.body)
        .then(
            res.send('Deletado')
        )

    });

app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});