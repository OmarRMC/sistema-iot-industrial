import express from 'express';
import QRCode from 'qrcode'
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


router.get('/qr', async (req, res) => {
    const dominio = `${req.protocol}://${req.get('host')}`;
    const qr = await QRCode.toDataURL(dominio);
    if (!qr) {
        return res.status(500).send('Error al generar el código QR');
    }
    res.render('qr-generado', { qr, title: 'Código QR de la pagina' });
});
export default router;
