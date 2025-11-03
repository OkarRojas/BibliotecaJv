//
import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/database.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import Usuario from './models/usuario.js'; // Ruta correcta según estructura


dotenv.config();

// Crear aplicación Express
const app = express();

// Conectar a la base de datos
conectarDB();

// Middlewares
app.use(express.json()); // Parsear JSON en el body de las peticiones
app.use(express.urlencoded({ extended: true })); // Parsear formularios

// Rutas
app.use('/api/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '¡Servidor funcionando!',
    version: '1.0.0'
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada' 
  });
});

// // Aquí defines el endpoint GET /usuarios
// app.get('/usuarios', async (req, res) => {
//   try {
//     const usuarios = await Usuario.find();
//     res.json(usuarios);
//   } catch (error) {
//     res.status(500).json({ mensaje: 'Error al obtener usuarios' });
//   }
// });

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
