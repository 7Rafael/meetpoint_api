import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Estabelecimento from './estabelecimento.js';

const Destaque = sequelize.define('destaque', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  descricao: {
    type: DataTypes.STRING,
    validate: {
      len: [10, 500]
    }
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  estabelecimento_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  avaliacoes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  timestamps: true,
  paranoid: true, 
  underscored: true 
});

Destaque.belongsTo(Estabelecimento, { 
  foreignKey: 'estabelecimento_id',
  onDelete: 'CASCADE',
  as: 'Estabelecimento'
});

Estabelecimento.hasMany(Destaque, {
  foreignKey: 'estabelecimento_id',
  onDelete: 'CASCADE',
  as: 'Destaques'
});

export default Destaque;