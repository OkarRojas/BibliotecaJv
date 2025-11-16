import mongoose from 'mongoose';

// Crear un schema para el contador
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Schema del Juego
const juegoSchema = new mongoose.Schema(
  {
    // ✅ ID numérico auto-incrementado
    id: { 
      type: Number,
      unique: true,
      index: true
    },
    
    // Información básica
    nombre: { 
      type: String, 
      required: true,
      trim: true
    },
    
    // Descripción y detalles
    descripcion: { 
      type: String,
      trim: true
    },
    
    // Género
    genero: { 
      type: String,
      required: true,
      enum: ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Puzzle', 'Deportes', 'Terror', 'Otra']
    },
    
    // Año de lanzamiento
    anioLanzamiento: { 
      type: Number,
      required: true
    },
    
    // Plataforma
    plataforma: { 
      type: String,
      required: true,
      enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile', 'Multiplataforma']
    },
    
    // Desarrolladora
    desarrolladora: { 
      type: String,
      required: true,
      trim: true
    },
    
    // Imagen/Portada
    imagen: { 
      type: String,
      default: null
    },
    
    // Rating/Calificación
    rating: { 
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    
    // Precio
    precio: { 
      type: Number,
      default: 0
    },
    
    // Tiempo desde la última vez que se jugó
    ultimaVezJugado: { 
      type: Date,
      default: null
    },
    
    // ¿Está en la biblioteca?
    enBiblioteca: { 
      type: Boolean,
      default: false
    },
    
    // Horas jugadas
    horasJugadas: { 
      type: Number,
      default: 0
    },
    
    // Timestamps
    createdAt: { 
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// ✅ MIDDLEWARE PARA AUTO-INCREMENTAR ID
juegoSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        'juego_id',
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.seq;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export { Counter };
export default mongoose.model('Juego', juegoSchema);
