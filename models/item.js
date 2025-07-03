import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Estabelecimento from './estabelecimento.js';
const Item = sequelize.define('item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    estabelecimento_id: { type: DataTypes.INTEGER, allowNull: false },
    avaliacoes: {type: DataTypes.INTEGER, allowNull: true},
    tipo: { type: DataTypes.STRING, allowNull: false },
    servico: { type: DataTypes.STRING, allowNull: false },
    local: { type: DataTypes.STRING, allowNull: false }
});

Item.belongsTo(Estabelecimento, {
  as: 'Estabelecimento',
  foreignKey: 'estabelecimento_id',
  onDelete: 'CASCADE'
});

Estabelecimento.hasMany(Item, {
  as: 'Itens',
  foreignKey: 'estabelecimento_id'
})

export default Item;