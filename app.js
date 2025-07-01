import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import sequelize from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', router);

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Database Sync & Server Start
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

startServer();