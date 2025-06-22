import app from './src/main.js';
const PORT = process.env.PORT || 3030;


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${process.env.PORT || 3030}`);
})