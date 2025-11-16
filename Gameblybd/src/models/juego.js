import mongoose from 'mongoose';

const juegoSchema = new mongoose.Schema(
  {
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
      type: String, // URL de la imagen
      default: null
    },
    
    // Rating/Calificación
    rating: { 
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    
    // Precio (si aplica)
    precio: { 
      type: Number,
      default: 0
    },
    
    // Tiempo desde la última vez que se jugó
    ultimaVezJugado: { 
      type: Date,
      default: null
    },
    
    // ¿Está en la biblioteca del usuario?
    enBiblioteca: { 
      type: Boolean,
      default: false
    },
    
    // Horas jugadas (opcional, para estadísticas)
    horasJugadas: { 
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true,
    collection: 'juegos' // ✅ IMPORTANTE: especifica que use la colección "juegos" en MongoDB
  }
);

// ✅ Evitar error de modelo duplicado en desarrollo
export default mongoose.models.Juego || mongoose.model('Juego', juegoSchema);
