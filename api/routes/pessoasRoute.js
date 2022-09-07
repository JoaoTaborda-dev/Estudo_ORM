const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
router.post('/pessoas', PessoaController.criaPessoa)
router.put('/pessoas/:id', PessoaController.atualizarPessoa)
router.delete('/pessoas/:id', PessoaController.apagaPessoa)
router.get(
  '/pessoas/:estudanteId/matricula',
  PessoaController.pegaMatriculaConfirmada
)
router.get(
  '/pessoas/:estudanteId/matricula/:matriculaId',
  PessoaController.pegaUmaMatricula
)
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.put(
  '/pessoas/:estudanteId/matricula/:matriculaId',
  PessoaController.atualizarMatricula
)
router.delete(
  '/pessoas/:estudanteId/matricula/:matriculaId',
  PessoaController.apagaMatricula
)

module.exports = router
