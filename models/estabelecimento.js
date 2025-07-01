import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

const Estabelecimento = sequelize.define('estabelecimento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cnpj: { 
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    }
  },
  senha: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 255]
    }
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  categoria: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imagem: { type: DataTypes.BLOB, allowNull: true }
}, {
  hooks: {
    beforeCreate: async (estabelecimento) => {
      if (estabelecimento.senha) {
        const salt = await bcrypt.genSalt(10);
        estabelecimento.senha = await bcrypt.hash(estabelecimento.senha, salt);
      }
    },
    beforeUpdate: async (estabelecimento) => {
      if (estabelecimento.changed('senha')) {
        const salt = await bcrypt.genSalt(10);
        estabelecimento.senha = await bcrypt.hash(estabelecimento.senha, salt);
      }
    }
  }

});

export default Estabelecimento;