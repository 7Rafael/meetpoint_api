import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cliente = sequelize.define('cliente', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cpf: { type: DataTypes.STRING, allowNull: true },
  nome: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false }
});


export default Cliente;