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
function cadastrar( nome, sobrenome, telefone, email, senha, confirmarSenha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",  nome, sobrenome ,telefone, email, senha, confirmarSenha);
    
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
            SELECT count(idVotacao) AS totalVotos FROM votacao;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function getKpi(idUser) {
    var instrucaoSql = `
            select count(u.nome) as qtd from usuario u left join votacao v on u.idUsuario = v.fkUsuario where u.idUsuario = ${idUser};
        `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarConjuntosVotados,
    totalDeVotos,
    getKpi
};