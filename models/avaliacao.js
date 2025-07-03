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
      len: [5, 500]
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
  timestamps: true, 
  paranoid: true 
});

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
  onDelete: 'RESTRICT', 
  as: 'Tipo'
});

Avaliacao.belongsTo(Comentario, { 
  foreignKey: 'comentario_id',
  onDelete: 'SET NULL', 
  as: 'Comentario'
});

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

Comentario.hasOne(Avaliacao, {
  foreignKey: 'comentario_id',
  as: 'Avaliacao'
});

export default Avaliacao;