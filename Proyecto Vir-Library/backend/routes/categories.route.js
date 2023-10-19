import { Router } from 'express';
import connection from '../connection/mysql.source.js';

const categoriesRoute = Router();

// Obtener todas las categorías disponibles
categoriesRoute.get('/', (req, res) => {
  const query = 'SELECT * FROM Categorias';
  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).send({
        message: 'Error al obtener las categorías',
        detail: err
      });
    } else {
      res.send(rows);
    }
  });
});

// Obtener una categoría por su ID
categoriesRoute.get('/:id', (req, res) => {
  const categoryId = req.params.id;
  const query = 'SELECT * FROM Categorias WHERE ID = ?';
  connection.query(query, [categoryId], (err, rows) => {
    if (err) {
      res.status(500).send({
        message: 'Error al obtener la categoría',
        detail: err
      });
    } else {
      if (rows.length === 1) {
        res.send(rows[0]);
      } else {
        res.status(404).send({
          message: 'Categoría no encontrada'
        });
      }
    }
  });
});

export default categoriesRoute;