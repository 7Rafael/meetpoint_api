import Avaliacao from '../models/avaliacao.js';

const defaultIncludes = [
  { association: 'Cliente', attributes: ['id', 'nome'] },
  { association: 'Estabelecimento', attributes: ['id', 'nome'] },
  { association: 'Tipo', attributes: ['id', 'nome'] },
  { 
    association: 'Comentario',
    include: [{ association: 'Cliente', attributes: ['id', 'nome'] }]
  }
];

export const createAvaliacao = async (req, res) => {
  try {
    const { texto, cliente_id, estabelecimento_id, tipo_id, comentario_id, nota } = req.body;
    
    if (!cliente_id || !estabelecimento_id || !tipo_id || !nota) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: cliente_id, estabelecimento_id, tipo_id e nota' 
      });
    }

    const newAvaliacao = await Avaliacao.create({
      texto,
      cliente_id,
      estabelecimento_id,
      tipo_id,
      comentario_id: comentario_id || null, // Garante null se não fornecido
      nota
    }, {
      include: defaultIncludes // Retorna os dados relacionados
    });
    
    res.status(201).json(newAvaliacao);
  } catch (error) {
    res.status(400).json({ 
      error: 'Erro ao criar avaliação',
      details: error.message
    });
  }
};

export const getAvaliacoesByEstabelecimento = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll({
      where: { estabelecimento_id: req.params.id },
      include: defaultIncludes,
      order: [['createdAt', 'DESC']]
    });
    
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar avaliações',
      details: error.message
    });
  }
};


export const updateAvaliacao = async (req, res) => {
  try {
    const [updated] = await Avaliacao.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Avaliacao não encontrado' });
    const updatedAvaliacao = await Avaliacao.findByPk(req.params.id);
    res.json(updatedAvaliacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAvaliacao = async (req, res) => {
  try {
    const deleted = await Avaliacao.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Avaliacao não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
