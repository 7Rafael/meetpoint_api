import Destaque from '../models/destaque.js';

// Configuração padrão do include
const includeEstabelecimento = {
  association: 'Estabelecimento',
  attributes: ['id', 'nome'] // Traz apenas estes campos
};

export const createDestaque = async (req, res) => {
  try {
    const { descricao, nome, estabelecimento_id, avaliacoes } = req.body;
    
    if (!nome || !estabelecimento_id) {
      return res.status(400).json({ 
        error: 'Nome e ID do estabelecimento são obrigatórios' 
      });
    }

    const newDestaque = await Destaque.create({
      descricao,
      nome,
      estabelecimento_id,
      avaliacoes: avaliacoes || 0 // Valor padrão
    });
    
    res.status(201).json(newDestaque);
  } catch (error) {
    res.status(400).json({ 
      error: 'Erro ao criar destaque',
      details: error.message
    });
  }
};

export const getAllDestaques = async (req, res) => {
  try {
    const destaques = await Destaque.findAll({
      include: [includeEstabelecimento],
      order: [['created_at', 'DESC']] // Ordena por data de criação
    });
    res.json(destaques);
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar destaques',
      details: error.message
    });
  }
};

export const getDestaqueById = async (req, res) => {
  try {
    const destaque = await Destaque.findByPk(req.params.id, {
      include: [includeEstabelecimento],
      paranoid: false // Para incluir registros deletados (opcional)
    });
    
    if (!destaque) {
      return res.status(404).json({ error: 'Destaque não encontrado' });
    }
    
    res.json(destaque);
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar destaque',
      details: error.message
    });
  }
};

export const updateDestaque = async (req, res) => {
  try {
    const [updated] = await Destaque.update(req.body, {
      where: { id: req.params.id },
      returning: true // Para PostgreSQL
    });
    
    if (!updated) {
      return res.status(404).json({ error: 'Destaque não encontrado' });
    }
    
    const updatedDestaque = await Destaque.findByPk(req.params.id, {
      include: [includeEstabelecimento]
    });
    
    res.json(updatedDestaque);
  } catch (error) {
    res.status(400).json({ 
      error: 'Erro ao atualizar destaque',
      details: error.message
    });
  }
};

export const deleteDestaque = async (req, res) => {
  try {
    const deleted = await Destaque.destroy({
      where: { id: req.params.id },
      force: true // Para desativar o soft delete se necessário
    });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Destaque não encontrado' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao remover destaque',
      details: error.message
    });
  }
};