import Item from '../models/item.js';
import Estabelecimento from '../models/estabelecimento.js';

const includeEstabelecimento = {
  model: Estabelecimento,
  as: 'Estabelecimento'
};

export const createItem = async (req, res) => {
  try {
    const { nome, estabelecimento_id, tipo, servico, local } = req.body;
    if (!nome || !estabelecimento_id || !tipo || !servico || !local) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newItem = await Item.create({
      nome,
      estabelecimento_id,
      tipo,
      servico,
      local,
      avaliacoes: req.body.avaliacoes || 0
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [includeEstabelecimento]
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: "Verifique a associação no modelo Item"
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, {
      include: [includeEstabelecimento]
    });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateItem = async (req, res) => {
  try {
    const [updated] = await Item.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    const updatedItem = await Item.findByPk(req.params.id);
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};