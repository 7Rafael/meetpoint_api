import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Estabelecimento from '../models/estabelecimento.js';

// Configurações JWT (use variáveis de ambiente em produção)
const JWT_SECRET = 'sua_chave_secreta_super_segura';
const JWT_EXPIRES_IN = '1h';

export const loginEstabelecimento = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    // Busca o estabelecimento incluindo a senha (normalmente excluída por padrão)
    const estabelecimento = await Estabelecimento.findOne({ where: { email } });

    if (!estabelecimento) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, estabelecimento.senha);
        if (!senhaValida) {
          return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
      {
        id: estabelecimento.id,
        email: estabelecimento.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return res.status(200).json({
      success: true,
      token,
      estabelecimento: {
        id: estabelecimento.id,
        nome: estabelecimento.nome,
        email: estabelecimento.email,
        createdAt: estabelecimento.createdAt,
        updatedAt: estabelecimento.updatedAt
      }
    });
    
  } catch (error) {
    console.error('Erro detalhado no login:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const createEstabelecimento = async (req, res) => {
  console.log('Dados recebidos:', req.body); // Log dos dados recebidos
  
  try {
    const { nome, cnpj, senha, email, categoria } = req.body;

    // Validação básica
    if (!nome || !cnpj || !senha || !email || !categoria) {
      console.log('Campos faltando:', { nome, cnpj, senha, email, categoria });
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    console.log('Verificando estabelecimento existente...');
    const estabelecimentoExistente = await Estabelecimento.findOne({
      where: {
        [Op.or]: [
          { email },
          { cnpj }
        ]
      }
    });

    if (estabelecimentoExistente) {
      console.log('Estabelecimento já existe:', estabelecimentoExistente);
      const campo = estabelecimentoExistente.email === email ? 'email' : 'CNPJ';
      return res.status(409).json({ error: `${campo} já cadastrado` });
    }

    console.log('Criando hash da senha...');
    const senhaHash = await bcrypt.hash(senha, 10);
    
    console.log('Criando novo estabelecimento...');
    const newEstabelecimento = await Estabelecimento.create({ 
      nome, 
      cnpj, 
      senha,
      email, 
      categoria 
    });
    
    console.log('Estabelecimento criado com sucesso:', newEstabelecimento.id);
    const estabelecimentoSemSenha = {
      id: newEstabelecimento.id,
      nome: newEstabelecimento.nome,
      cnpj: newEstabelecimento.cnpj,
      email: newEstabelecimento.email,
      categoria: newEstabelecimento.categoria,
      createdAt: newEstabelecimento.createdAt,
      updatedAt: newEstabelecimento.updatedAt
    };
    
    return res.status(201).json(estabelecimentoSemSenha);
  } catch (error) {
    console.error('Erro detalhado:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      errors: error.errors
    });
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        error: 'Erro de validação',
        details: error.errors.map(err => ({
          campo: err.path,
          mensagem: err.message
        }))
      });
    }
    
    return res.status(500).json({ 
      error: 'Erro interno no servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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
