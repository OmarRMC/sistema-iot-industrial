import express from 'express'
import path, { dirname } from 'path';
import session from 'express-session'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url';
import usuariosRouter from './routes/user.js';
import dashboardRouter from './routes/dashboard.js'
import { loginUsuario } from './repository/usuario.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secreto', resave: false, saveUninitialized: true }));

app.get('/login', (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render('login', { error, title: 'Sistema de Automatizacion' });
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const data = await loginUsuario(email, password);
        req.session.user = data.user;
        const token = jwt.sign({ user: data.user }, 'omar_dev', { expiresIn: '4h' });
        res.cookie('token', token, {
            httpOnly: true, // no accesible desde JS
            secure: false, // solo HTTPS
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 4 // 4 horas
        });
        res.redirect('/');
    } catch (err) {
        req.session.error = true;
        console.log(err)
        res.redirect('/login');
    }

});



app.get('/logout', (req, res) => {
    res.clearCookie('token');
    req.session.destroy();
    res.redirect('/login');
});


function verifyToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, 'omar_dev');
        req.session.user = decoded.user;
        res.locals.user = decoded.user;
    } catch (err) {
        res.clearCookie('token');
        req.session.destroy();
        return res.redirect('/login');
    }

    loadReqRes(req, res);

    next();
}


function loadReqRes(req, res) {
    res.locals.isAdmin = () => {
        return req.session.user && req.session.user.rol == 'admin';
    };
    res.locals.isAuthenticated = () => {
        return !!req.session.user;
    }
    res.locals.allowedUsuarios = () => {
        return req.session.user && (req.session.user.rol == 'admin');
    };
}

app.use((req, res, next) => {
    verifyToken(req, res, next);
});
app.use(usuariosRouter);
app.use(dashboardRouter);
// app.get('/', (req, res) => {
//     res.render('index', { title: 'Sistema de Automatizacion' });
// });
app.get('/test', (req, res) => {
    return res.json({
        message: 'Esta es la página para ver el equipo. Implementa la lógica para mostrar los detalles del equipo aquí.'
    });
})

export default app;