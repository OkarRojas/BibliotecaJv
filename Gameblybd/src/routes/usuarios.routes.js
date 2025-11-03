//
import express from 'express';
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario} from '../controllers/usuarios.controller.js';

const router = express.Router();

// Definir rutas
router.get('/', obtenerUsuarios);           // GET /api/usuarios
router.get('/:id', obtenerUsuarioPorId);    // GET /api/usuarios/:id
router.post('/', crearUsuario);             // POST /api/usuarios
router.put('/:id', actualizarUsuario);      // PUT /api/usuarios/:id
router.delete('/:id', eliminarUsuario);     // DELETE /api/usuarios/:id

export default router;
