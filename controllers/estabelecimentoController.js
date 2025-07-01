import Estabelecimento from '../models/estabelecimento.js';

export const createEstabelecimento = async (req, res) => {
  try {
    const { nome, cnpj, senha, email, categoria } = req.body;
    const newEstabelecimento = await Estabelecimento.create({ 
      nome, cnpj, senha, email, categoria 
    });
    res.status(201).json(newEstabelecimento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllEstabelecimentos = async (req, res) => {
  try {
    const estabelecimentos = await Estabelecimento.findAll();
    res.json(estabelecimentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add update, delete, and getById similar to Estabelecimento controller

export const getEstabelecimentoById = async (req, res) => {
  try {
    const estabelecimento = await Estabelecimento.findByPk(req.params.id);
    if (!estabelecimento) return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    res.json(estabelecimento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEstabelecimento = async (req, res) => {
  try {
    const [updated] = await Estabelecimento.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    const updatedEstabelecimento = await Estabelecimento.findByPk(req.params.id);
    res.json(updatedEstabelecimento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEstabelecimento = async (req, res) => {
  try {
    const deleted = await Estabelecimento.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
