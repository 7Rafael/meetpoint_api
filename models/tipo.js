import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tipo = sequelize.define('tipo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  nota: { type: DataTypes.INTEGER, allowNull: false }
});

export default Tipo;