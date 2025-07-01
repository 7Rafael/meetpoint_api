import Comentario from '../models/comentario.js';

// Configuração padrão do include
const includeCliente = {
  association: 'Cliente' // Usando o alias definido no modelo
};

export const createComentario = async (req, res) => {
  try {
    const { texto, cliente_id } = req.body;
    if (!texto || !cliente_id) {
      return res.status(400).json({ error: 'Texto e cliente_id são obrigatórios' });
    }
    const newComentario = await Comentario.create({ texto, cliente_id });
    res.status(201).json(newComentario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.findAll({
      include: [includeCliente],
      order: [['createdAt', 'DESC']] // Ordena do mais recente
    });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComentarioById = async (req, res) => {
  try {
    const comentario = await Comentario.findByPk(req.params.id, {
      include: [includeCliente]
    });
    if (!comentario) return res.status(404).json({ error: 'Comentário não encontrado' });
    res.json(comentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateComentario = async (req, res) => {
  try {
    const [updated] = await Comentario.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Comentario not found' });
    const updatedComentario = await Comentario.findByPk(req.params.id);
    res.json(updatedComentario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteComentario = async (req, res) => {
  try {
    const deleted = await Comentario.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Comentario not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};