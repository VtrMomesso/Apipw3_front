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

//ROTA DE LISTAGEM DE ARTES MARCIAL
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
        const urlListagemCategoria = `http://localhost:3000/listaArtesMarcial/${id}`;
        
        axios.get(urlListagemCategoria)
        .then(
            (response)=>{

                let artesMarcial = response.data;
                res.render('artesMarcial/formEdicao', {artesMarcial});

            }
        )
    });

    app.post('/formEdicaoArtes', (req, res)=>{


         const urlListagemAnotacao = `http://localhost:3000/alterarArtesMarcial`;
        
        axios.put(urlListagemAnotacao, req.body)
        .then(
            res.redirect('http://localhost:3001/listagemArtesMarcial')
        )
        
    })

    //ROTA PARA DELETAR ESTILO MARCIAL
    app.get('/deletarMarcial/:id', (req, res)=>{

        let {id} = req.params
        console.log(id);

        const urlExcluirArtes = `http://localhost:3000/excluirArtesMarcial/${id}`;
        console.log(req.body);

        axios.delete(urlExcluirArtes)
        .then(
            res.send('Deletado'),

            res.redirect('http://localhost:3001/listagemArtesMarcial')
        )

    });

app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});