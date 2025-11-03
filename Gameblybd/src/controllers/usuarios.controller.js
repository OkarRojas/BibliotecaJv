import Usuario from '../models/usuario.js';

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    
    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: usuarioGuardado
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error al crear usuario',
      detalles: error.message
    });
  }
};

// Crear múltiples usuarios
export const crearVariosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.insertMany(req.body);
    res.status(201).json({
      mensaje: `${usuarios.length} usuarios creados`,
      usuarios
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error al crear usuarios',
      detalles: error.message
    });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  console.log('GET /api/usuarios ejecutado');
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener usuario',
      detalles: error.message
    });
  }
};

// Buscar usuarios con filtros
export const buscarUsuarios = async (req, res) => {
  try {
    // Buscar usuarios mayores de 25 años y activos
    const usuarios = await Usuario.find({
      edad: { $gte: 25 },
      activo: true
    });
    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json({
      error: 'Error en la búsqueda',
      detalles: error.message
    });
  }
};

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,
        runValidators: true
      }
    );
    if (!usuarioActualizado) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      mensaje: 'Usuario actualizado',
      usuario: usuarioActualizado
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error al actualizar usuario',
      detalles: error.message
    });
  }
};

// Actualizar múltiples usuarios
export const actualizarVariosUsuarios = async (req, res) => {
  try {
    const resultado = await Usuario.updateMany(
      { activo: false },
      { $set: { activo: true } }
    );
    res.status(200).json({
      mensaje: `${resultado.modifiedCount} usuarios actualizados`
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error al actualizar',
      detalles: error.message
    });
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      mensaje: 'Usuario eliminado exitosamente',
      usuario: usuarioEliminado
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar usuario',
      detalles: error.message
    });
  }
};

// Eliminar múltiples usuarios
export const eliminarVariosUsuarios = async (req, res) => {
  try {
    const resultado = await Usuario.deleteMany({
      activo: false
    });
    res.status(200).json({
      mensaje: `${resultado.deletedCount} usuarios eliminados`
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar',
      detalles: error.message
    });
  }
};