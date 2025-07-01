import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Estabelecimento = sequelize.define('estabelecimento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  cnpj: { type: DataTypes.STRING, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: false },
  imagem: { type: DataTypes.BLOB, allowNull: true },
});

export default Estabelecimento;