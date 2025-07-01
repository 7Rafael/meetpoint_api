import Tipo from '../models/tipo.js';

export const createTipo = async (req, res) => {
  try {
    const { nome, nota } = req.body;
    if (!nome || nota === undefined) {
      return res.status(400).json({ error: 'Nome and nota are required' });
    }
    const newTipo = await Tipo.create({ nome, nota });
    res.status(201).json(newTipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllTipos = async (req, res) => {
  try {
    const tipos = await Tipo.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTipoById = async (req, res) => {
  try {
    const tipo = await Tipo.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'Tipo not found' });
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTipo = async (req, res) => {
  try {
    const [updated] = await Tipo.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Tipo not found' });
    const updatedTipo = await Tipo.findByPk(req.params.id);
    res.json(updatedTipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTipo = async (req, res) => {
  try {
    const deleted = await Tipo.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Tipo not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};