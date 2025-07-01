import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Cliente from './cliente.js';
import Estabelecimento from './estabelecimento.js';
import Tipo from './tipo.js';
import Comentario from './comentario.js';

const Avaliacao = sequelize.define('avaliacao', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  texto: { 
    type: DataTypes.STRING,
    validate: {
      len: [5, 500] // Valida tamanho do texto
    }
  },
  cliente_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  estabelecimento_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  tipo_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  comentario_id: { 
    type: DataTypes.INTEGER, 
    allowNull: true 
  },
  foto: { 
    type: DataTypes.BLOB,
    allowNull: true
  },
  nota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  timestamps: true, // Adiciona createdAt e updatedAt
  paranoid: true    // Habilita soft delete (opcional)
});

// Associações com CASCADE e aliases explícitos
Avaliacao.belongsTo(Cliente, { 
  foreignKey: 'cliente_id',
  onDelete: 'CASCADE',
  as: 'Cliente'
});

Avaliacao.belongsTo(Estabelecimento, { 
  foreignKey: 'estabelecimento_id',
  onDelete: 'CASCADE',
  as: 'Estabelecimento'
});

Avaliacao.belongsTo(Tipo, { 
  foreignKey: 'tipo_id',
  onDelete: 'RESTRICT', // Impede deletar tipo se houver avaliações
  as: 'Tipo'
});

Avaliacao.belongsTo(Comentario, { 
  foreignKey: 'comentario_id',
  onDelete: 'SET NULL', // Mantém avaliação se comentário for deletado
  as: 'Comentario'
});

// Relações inversas
Cliente.hasMany(Avaliacao, { 
  foreignKey: 'cliente_id',
  as: 'Avaliacoes'
});

Estabelecimento.hasMany(Avaliacao, { 
  foreignKey: 'estabelecimento_id',
  as: 'Avaliacoes'
});

Tipo.hasMany(Avaliacao, { 
  foreignKey: 'tipo_id',
  as: 'Avaliacoes'
});

Comentario.hasOne(Avaliacao, {  // Alterado para hasOne
  foreignKey: 'comentario_id',
  as: 'Avaliacao'
});

export default Avaliacao;