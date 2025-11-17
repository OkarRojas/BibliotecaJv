import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// Importar rutas
import usuariosRoutes from './routes/usuarios.routes.js';
import gamesRoutes from './routes/Games.js';

// Inicializar aplicación Express
const app = express();

// CORS configuration: allow specific origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'https://OkarRojas.github.io'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Body parsing
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/games', gamesRoutes);

// Conexión a MongoDB con Mongoose usando variables de entorno
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('✅ MongoDB conectado'))
    .catch((err) => console.error('❌ Error conectando a MongoDB:', err.message));
} else {
  console.warn('⚠️  Variable de entorno MONGODB_URI/MONGO_URI no definida.');
}

// Iniciar servidor local solo si NO es producción
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
}

// Exportar app para despliegues serverless
export default app;
