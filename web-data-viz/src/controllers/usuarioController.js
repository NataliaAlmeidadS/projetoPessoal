
var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var confirmarSenha = req.body.confirmacaoSenhaServer

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha, confirmarSenha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            idusuario: resultadoAutenticar[0].idusuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome
                        })
                        res.status(200).json(resultadoAutenticar);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
   var confirmarSenha = req.body.confirmacaoSenhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome== undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else if (confirmarSenha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, sobrenome, telefone, email, senha, confirmarSenha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarConjuntosVotados(req, res) { 
    usuarioModel.buscarConjuntosVotados()
        .then(function (resultado) {
            console.log(resultado);  // Para depurar e verificar o que está sendo retornado
            if (Array.isArray(resultado) && resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.error('Erro ao buscar os conjuntos votados:', erro);
            res.status(500).json({ error: 'Erro ao buscar os conjuntos votados', details: erro.message });
        });
}


function obterTotalVotos(req, res) {
    var dadosGrafico = {};
    var idUser = req.params.idUser;

    usuarioModel.totalDeVotos(idUser)
        .then(function (resultado) {
            dadosGrafico.totalVotos = resultado[0].totalVotos;
            return usuarioModel.totalDeVotos(req);
        })

        .catch(function (erro) {
            console.log('Erro ao obter total de votos:', erro);
            res.status(500).json(erro);
        });
}

function obterTotalVotosIndividual(req, res) {
    var dadosGrafico2 = {};
    var idUser = req.params.idUser;

    usuarioModel.totalDeVotosIndividual(idUser)
        .then(function (resultado) {
            dadosGrafico2.totalVotos = resultado[0].totalVotos;
            return usuarioModel.totalDeVotosIndividual(req);
        })

        .catch(function (erro) {
            console.log('Erro ao obter total de votos:', erro);
            res.status(500).json(erro);
        });
}

function getKpi(req, res) {
    var idUser = req.query.parametro;
        usuarioModel.getKpi(idUser).then(resultado => {
            res.json(resultado)
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar as estatisticas", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    autenticar,
    cadastrar,
    buscarConjuntosVotados,
    obterTotalVotos,
    getKpi,
    obterTotalVotosIndividual
}

