import express from 'express';
import { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario, actualizarPasswordUsuario } from '../repository/usuario.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});

router.get('/informacion-de-proyecto', async (req, res) => {
    res.render('info-proyecto', { title: 'Informacion del proyecto' });
});

router.get('/manuales', (req, res) => {
    res.render('manuales', { title: 'Manuales' });
});

export default router;
