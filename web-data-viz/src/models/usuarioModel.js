var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT  idusuario, nome,sobrenome, telefone, email, senha, confirmarSenha FROM usuario WHERE email='${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, sobrenome, telefone, email, senha, confirmarSenha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, telefone, email, senha, confirmarSenha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, telefone, email, senha, confirmarSenha) VALUES ('${nome}','${sobrenome}','${telefone}', '${email}', '${senha}', '${confirmarSenha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarConjuntosVotados() {
    // Define a instrução SQL para selecionar os conjuntos de roupas mais votados
    var instrucaoSql = `
            SELECT 
 livro.nome as 'Livro Escolhido',
 count(idVotacao) as 'Livro Vencedor'
 FROM votacao 
 JOIN livro
 ON fkLivro = idLivro
 group by  livro.nome;
        `;

    // Log da instrução SQL (opcional)
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executar a instrução SQL e retornar os resultados
    return database.executar(instrucaoSql);
}
function totalDeVotos() {
    var instrucaoSql = `
       SELECT
            fkLivro AS idLivro,
            COUNT(*) AS totalVotos
        FROM
            votacao
        GROUP BY
            fkLivro
        ORDER BY
            totalVotos DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function totalDeVotosIndividual(idUser) {
    var instrucaoSql = `
       SELECT 
    livro.nome AS nomeLivro,
    usuario.idUsuario AS idUser,
    COUNT(votacao.fkLivro) AS qtdVotos,
    MAX(votacao.dataHora) AS ultimaVotacao
FROM 
    votacao
JOIN 
    usuario ON votacao.fkUsuario = usuario.idUsuario
JOIN 
    livro ON votacao.fkLivro = livro.idLivro
WHERE 
    usuario.idUsuario = ${idUser}
GROUP BY 
    livro.nome, usuario.idUsuario 
ORDER BY 
    qtdVotos DESC;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Model
function buscarErroAcertoAdm() {
    var instrucaoSql = `
    SELECT 
        idQuiz,
        qntdAcertos,
        qntdErros,
        DATE_FORMAT(dtQuiz, '%d/%m/%Y') AS dataQuiz
    FROM quiz
    ORDER BY dtQuiz DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);  // Executa a query e retorna os dados
}

function getKpi(idUser) {
    var instrucaoSql = `
        SELECT COUNT(*) AS qtd 
        FROM votacao 
        WHERE fkUsuario = ${idUser};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql).then((resultado) => {
        if (resultado.length > 0 && resultado[0].qtd !== undefined) {
            return resultado[0].qtd;
        } else {
            return 0;
        }
    });
}

function buscarMetricasQuiz(idUser) {
    const instrucaoSql = `select * from quiz where fkUsuario = ${idUser};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrarRespostaQuiz(idUser, acertos, erros, respostasDetalhadas) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrarRespostaQuiz:", idUser, acertos, erros);

    var instrucaoSql = `
        INSERT INTO quiz (qntdAcertos, qntdErros, dtQuiz ,fkUsuario) VALUES ('${acertos}','${erros}',NOW(),'${idUser}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql)
        .then(function(resultado) {
            const quizId = resultado.insertId; 
            const promises = respostasDetalhadas.map(resposta => {
                return registrarRespostaDetalhada(quizId, resposta.questionId, resposta.correct);
            });

            // Esperamos todas as respostas detalhadas serem inseridas
            return Promise.all(promises);
        })
        .catch(function(erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            throw erro;
        });
}

module.exports = {
    autenticar,
    cadastrar,
    buscarConjuntosVotados,
    totalDeVotos,
    buscarMetricasQuiz,
    getKpi,
    totalDeVotosIndividual,
    registrarRespostaQuiz,
    buscarErroAcertoAdm
};