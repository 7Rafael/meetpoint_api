// config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Change this line:
// export default sequelize;
// To either:
export { sequelize as default };
// Or keep the original but ensure consistent imports