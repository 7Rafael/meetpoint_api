import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cliente from '../models/cliente.js';

// Configurações (em produção, use variáveis de ambiente)
const JWT_SECRET = 'sua_chave_secreta_super_segura'; // Substitua por uma chave segura
const JWT_EXPIRES_IN = '1h';

export const loginCliente = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    // 1. Validação básica
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // 2. Buscar usuário pelo email
    const cliente = await Cliente.findOne({ where: { email } });
    
    if (!cliente) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // 3. Verificar senha
    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // 4. Gerar token JWT
    const token = jwt.sign(
      {
        id: cliente.id,
        email: cliente.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // 5. Retornar resposta com token
    return res.status(200).json({
      success: true,
      token,
      cliente: {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        createdAt: cliente.createdAt,
        updatedAt: cliente.updatedAt
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const createCliente = async (req, res) => {
  try {
    const { cpf, nome, email, senha } = req.body;

    // Verificar se todos os campos estão presentes
    if (!cpf || !nome || !email || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verificar se o email já está cadastrado
    const clienteExistente = await Cliente.findOne({ where: { email } });
    if (clienteExistente) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }

    // Criar hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);
    
    // Criar novo cliente
    const newCliente = await Cliente.create({ 
      cpf, 
      nome, 
      email, 
      senha: senhaHash
    });
    
    // Retornar resposta sem a senha
    const clienteSemSenha = {
      id: newCliente.id,
      cpf: newCliente.cpf,
      nome: newCliente.nome,
      email: newCliente.email,
      createdAt: newCliente.createdAt,
      updatedAt: newCliente.updatedAt
    };
    
    return res.status(201).json(clienteSemSenha);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};



export const getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const [updated] = await Cliente.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Cliente não encontrado' });
    const updatedCliente = await Cliente.findByPk(req.params.id);
    res.json(updatedCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const deleted = await Cliente.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};