var database = require("../database/config");

function votacao(idUsuario, livroEscolhido) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function livro():",);



    var instrucao2 = `
        INSERT INTO votacao (fkUsuario, fkLivro) VALUES ('${idUsuario}','${livroEscolhido}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao2);
    return database.executar(instrucao2);
}


module.exports = {
    votacao
};