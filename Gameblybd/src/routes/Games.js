import express from 'express';
import Juego from '../models/juego.js';

const router = express.Router();

// ✅ GET todos los juegos CON PAGINACIÓN
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Juego.countDocuments();
    const juegos = await Juego.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      juegos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET juegos JUGADOS RECIENTEMENTE (últimos 30 días)
router.get('/recientes/ultimos', async (req, res) => {
  try {
    const hace30Dias = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const juegos = await Juego.find({
      ultimaVezJugado: { $gte: hace30Dias }
    })
      .sort({ ultimaVezJugado: -1 })
      .limit(10);

    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET juegos en BIBLIOTECA del usuario
router.get('/biblioteca/mis-juegos', async (req, res) => {
  try {
    const juegos = await Juego.find({ enBiblioteca: true })
      .sort({ nombre: 1 });

    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET un juego por ID
router.get('/:id', async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json(juego);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ BUSCAR juegos por nombre o género
router.get('/buscar/filtro', async (req, res) => {
  try {
    const { query, genero } = req.query;
    
    let filtro = {};
    if (query) {
      filtro.$or = [
        { nombre: { $regex: query, $options: 'i' } },
        { descripcion: { $regex: query, $options: 'i' } }
      ];
    }
    if (genero) {
      filtro.genero = genero;
    }

    const juegos = await Juego.find(filtro).limit(20);
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ POST crear nuevo juego
router.post('/', async (req, res) => {
  try {
    const juego = new Juego(req.body);
    await juego.save();
    res.status(201).json(juego);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ PUT actualizar juego (ej: marcar como jugado recientemente)
router.put('/:id', async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json(juego);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ DELETE juego
router.delete('/:id', async (req, res) => {
  try {
    const juego = await Juego.findByIdAndDelete(req.params.id);
    if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json({ message: 'Juego eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
