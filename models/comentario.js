import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Cliente from './cliente.js';

const Comentario = sequelize.define('comentario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  texto: DataTypes.STRING,
  cliente_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  timestamps: true 
});

Comentario.belongsTo(Cliente, { 
  foreignKey: 'cliente_id',
  onDelete: 'CASCADE', 
  as: 'Cliente'
});

Cliente.hasMany(Comentario, {
  foreignKey: 'cliente_id',
  onDelete: 'CASCADE',
  as: 'Comentarios'
});

export default Comentario;