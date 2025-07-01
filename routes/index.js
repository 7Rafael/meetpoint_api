import express from 'express';
import * as clienteController from '../controllers/clienteController.js';
import * as estabelecimentoController from '../controllers/estabelecimentoController.js';
import * as avaliacaoController from '../controllers/avaliacaoController.js';
import * as comentarioController from '../controllers/comentarioController.js';
import * as destaqueController from '../controllers/destaqueController.js';
import * as itemController from '../controllers/itemController.js';
import * as tipoController from '../controllers/tipoController.js';

const router = express.Router();

// Cliente Routes
router.post('/clientes', clienteController.createCliente);
router.get('/clientes', clienteController.getAllClientes);
router.get('/clientes/:id', clienteController.getClienteById);
router.put('/clientes/:id', clienteController.updateCliente);
router.delete('/clientes/:id', clienteController.deleteCliente);

// Estabelecimento Routes
router.post('/estabelecimentos', estabelecimentoController.createEstabelecimento);
router.get('/estabelecimentos', estabelecimentoController.getAllEstabelecimentos);
router.get('/estabelecimento/:id', estabelecimentoController.getEstabelecimentoById);
router.put('/estabelecimentos/:id', estabelecimentoController.updateEstabelecimento);
router.delete('/estabelecimentos/:id', estabelecimentoController.deleteEstabelecimento);

// Avaliacao Routes
router.post('/avaliacoes', avaliacaoController.createAvaliacao);
router.get('/estabelecimentos/:id/avaliacoes', avaliacaoController.getAvaliacoesByEstabelecimento);
router.put('/avaliacoes/:id', avaliacaoController.updateAvaliacao);
router.delete('/avaliacoes/:id', avaliacaoController.deleteAvaliacao);

// Comentario Routes
router.post('/comentarios', comentarioController.createComentario);
router.get('/comentarios', comentarioController.getAllComentarios);
router.get('/comentarios/:id', comentarioController.getComentarioById);
router.put('/comentarios/:id', comentarioController.updateComentario);
router.delete('/comentarios/:id', comentarioController.deleteComentario);

// Destaque Routes
router.post('/destaques', destaqueController.createDestaque);
router.get('/destaques', destaqueController.getAllDestaques);
router.get('/destaques/:id', destaqueController.getDestaqueById);
router.put('/destaques/:id', destaqueController.updateDestaque);
router.delete('/destaques/:id', destaqueController.deleteDestaque);

// Item Routes
router.post('/items', itemController.createItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItemById);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

// Tipo Routes
router.post('/tipos', tipoController.createTipo);
router.get('/tipos', tipoController.getAllTipos);
router.get('/tipos/:id', tipoController.getTipoById);
router.put('/tipos/:id', tipoController.updateTipo);
router.delete('/tipos/:id', tipoController.deleteTipo);

export default router;