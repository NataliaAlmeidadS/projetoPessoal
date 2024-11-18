const livroModel = require("../models/livroModel");

function cadastrarLivro(req, res) {
    const { idusuario, livroEscolhido } = req.body;

    console.log(livroEscolhido)
    // if (!idUsuario || !livroEscolhido) {
    //     return res.status(400).json({ mensagem: "ID do usuário e conjunto escolhido são obrigatórios!" });
    // }
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAa")
    livroModel
        .votacao(idusuario, livroEscolhido)
        .then(resultado => {
            if (resultado.affectedRows > 0) {
                res.status(200).json({ mensagem: "Votação realizada com sucesso!" });
            } else {
                res.status(500).json({ mensagem: "Falha ao registrar a votação. Tente novamente!" });
            }
        })
        .catch(erro => {
            console.error("Erro ao cadastrar livro:", erro.sqlMessage);
            res.status(500).json({ mensagem: "Erro no servidor ao registrar o voto.", detalhes: erro.sqlMessage });
        });
}

module.exports = {
    cadastrarLivro
};
