import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connection from './connection/mysql.source.js';
import userRoute from './routes/user.route.js';
import albumsRoute from './routes/albums.route.js';
import mediaRoute from './routes/media.route.js';
import commentsRoute from './routes/comments.route.js';
import categoriesRoute from './routes/categories.route.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));


app.use(cors());

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Base de datos conectada');
  }
});


app.use('/user', userRoute);
app.use('/albums', albumsRoute);
app.use('/media', mediaRoute);
app.use('/comments', commentsRoute);
app.use('/categories', categoriesRoute);


app.use('*', async (req, res) => {
  res.status(403).send({ error: 'UNACCESIBLE' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});