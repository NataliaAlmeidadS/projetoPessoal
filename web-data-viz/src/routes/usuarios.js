var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

// Ajuste a rota para "/dados-dashboard"
router.get("/dados-dashboard", function (req, res) {
    usuarioController.buscarConjuntosVotados(req, res);
});


router.get("/dados-grafico2", function (req, res) {
    usuarioController.obterTotalVotos(req, res);
});

router.get("/votacaoIndividual", function (req, res) {
    usuarioController.obterTotalVotosIndividual(req, res);
});

router.get("/kpi", function (req, res) {
    usuarioController.getKpi(req, res);
});

// router.get("/mostrarGrafico", function (req, res) {
//     usuarioController.getKpi(req, res);
// });

router.get("/buscarMetricasQuiz", function (req, res) {
    usuarioController.buscarMetricasQuiz(req, res);
});

router.post("/registrarMetricasQuiz", function (req, res) {
    usuarioController.registrarRespostaQuiz(req, res);
});



module.exports = router;