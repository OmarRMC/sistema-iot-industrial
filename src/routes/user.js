import express from 'express';
import { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario, actualizarPasswordUsuario } from '../repository/usuario.js';

const router = express.Router();

router.get('/usuarios', async (req, res) => {
    const usuarios = await getAllUsuarios();
    res.render('usuarios', { usuarios, title: 'Lista de Usuarios' });
});

router.get('/usuario/nuevo', (req, res) => {
    res.render('nuevo-usuario', { error: null, title: 'Nuevo Usuario' });
});

router.post('/usuario', async (req, res) => {
    const data = req.body;
    if (data.password == '') {
        return res.render('nuevo-usuario', { error: 'Las contraseñas no coinciden' });
    }
    await createUsuario(data);
    res.redirect('/usuarios');
});

router.get('/usuario/:id/editar', async (req, res) => {
    const usuario = await getUsuarioById(req.params.id);
    res.render('editar-usuario', { usuario, title: 'Editar Usuario' });
});

router.post('/usuario/:id', async (req, res) => {
    const data = req.body;
    await updateUsuario(req, data);
    res.redirect('/usuarios');
});

router.post('/usuario/:id/eliminar', async (req, res) => {
    await deleteUsuario(req.params.id);
    res.redirect('/usuarios');
});

router.get('/perfil', async (req, res) => {
    const user = req.session.user;
    // console.log(user);
    if (!user) return res.redirect('/login');
    res.render('user/perfil', { user, title: 'Perfil de Usuario' });
});

router.post('/perfil/password', async (req, res) => {
    const { actual, nueva, confirmar } = req.body;
    const usuario = req.session.user;

    if (!usuario) return res.redirect('/login');
    if (!actual || !nueva || !confirmar) {
        return res.render('user/perfil', { user: usuario, error: 'Todos los campos son obligatorios' });
    }
    if (nueva !== confirmar) {
        return res.render('user/perfil', { user: usuario, error: 'Las contraseñas no coinciden' });
    }

    const dbUsuario = await getUsuarioById(usuario.id);
    if (dbUsuario.password !== actual) {
        return res.render('user/perfil', { user: usuario, error: 'Contraseña actual incorrecta' });
    }

    try {
        await actualizarPasswordUsuario(usuario.id, nueva);
        return res.render('user/perfil', { user: usuario, success: 'Contraseña actualizada correctamente' });
    } catch (err) {
        console.log('Error actualizando contraseña:', err);
        return res.render('user/perfil', { user: usuario, error: 'Error actualizando la contraseña' });
    }
});
export default router;
