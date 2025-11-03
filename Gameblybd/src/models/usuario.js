//
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio'],
    enum: ['masculino', 'femenino', 'otro'],
    trim: true
  },
  estrellas: {
    type: Number,
    min: [1, 'La calificación mínima es 1 estrella'],
    max: [5, 'La calificación máxima es 5 estrellas']
  },
  
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
