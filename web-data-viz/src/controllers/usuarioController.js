
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
                        }); // Apenas esta resposta
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
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (confirmarSenha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

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


// Controller - Obter Total de Votos
function obterTotalVotos(req, res) {
    var idUser = req.params.idUser;  // Obter o ID do usuário da URL

    usuarioModel.totalDeVotos(idUser)  // Chama a função do model para obter o total de votos
        .then(function (resultado) {
            // Verifica se o resultado contém dados
            if (resultado && resultado.length > 0) {
                res.json({ totalVotos: resultado[0].totalVotos });  // Retorna o total de votos
            } else {
                res.status(404).json({ mensagem: 'Usuário não encontrado ou sem votos.' });
            }
        })
        .catch(function (erro) {
            console.log('Erro ao obter total de votos:', erro);
            res.status(500).json({ mensagem: 'Erro no servidor.', erro: erro });
        });
}

function obterTotalVotos(req, res) {
    usuarioModel.totalDeVotos()
        .then(function (resultado) {
            res.json(resultado);  // Retorna os dados dos votos por livro
        })
        .catch(function (erro) {
            console.log('Erro ao obter total de votos:', erro);
            res.status(500).json(erro);
        });
}

function obterTotalVotosIndividual(req, res) {
    var idUser = req.query.parametro;
    usuarioModel.totalDeVotosIndividual(idUser)
        .then(function (resultado) {
            res.json(resultado);
        })

        .catch(function (erro) {
            console.log('Erro ao obter total de votos:', erro);
            res.status(500).json(erro);
        });
}

// Controller
function buscarErroAcertoAdm(req, res) {
    usuarioModel.buscarErroAcertoAdm()
        .then(function (resultado) {
            res.json(resultado);  // Retorna os dados para o front-end
        })
        .catch(function (erro) {
            console.log('Erro ao obter total de votos:', erro);
            res.status(500).json(erro);  // Retorna erro caso ocorra
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

function buscarMetricasQuiz(req, res) {
    var idUser = req.query.parametro;
    usuarioModel.buscarMetricasQuiz(idUser).then(resultado => {
        res.json(resultado)
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as estatisticas", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function mostrarGrafico(req, res) {
    var idUser = req.query.parametro;
    usuarioModel.mostrarGrafico(idUser).then(resultado => {
        res.json(resultado)
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as estatisticas", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function registrarRespostaQuiz(req, res) {
    const idUser = req.body.idUserServer;
    const acertos = req.body.acertosServer;
    const erros = req.body.errosServer;
    const respostas = req.body.respostas; // Agora esperamos o array de respostas detalhadas

    // Registrar as métricas gerais de acertos e erros no banco de dados
    usuarioModel.registrarRespostaQuiz(idUser, acertos, erros)
        .then(function (resultado) {
            // Após o registro das métricas gerais, vamos registrar as respostas detalhadas
            const quizId = resultado.insertId;  // ID do quiz recém inserido no banco

            // Agora registramos as respostas de cada questão
            const promises = respostas.map(resposta => {
                return usuarioModel.registrarRespostaDetalhada(quizId, resposta.questionId, resposta.correct);
            });

            // Esperamos que todas as promessas de inserção das respostas sejam resolvidas
            return Promise.all(promises);
        })
        .then(function () {
            // Se tudo deu certo, retornamos um sucesso
            res.json({ message: "Métricas e respostas registradas com sucesso!" });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    autenticar,
    cadastrar,
    buscarConjuntosVotados,
    buscarMetricasQuiz,
    mostrarGrafico,
    getKpi,
    registrarRespostaQuiz,
    obterTotalVotos,
    obterTotalVotosIndividual,
    buscarErroAcertoAdm
}

