import { Router } from 'express';
import connection from '../connection/mysql.source.js';
const mediaRoute = Router();

// Obtener todas las imágenes
mediaRoute.get('/', (req, res) => {
  const query = 'SELECT * FROM Imagenes';
  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.send(rows);
    }
  });
});

// Cargar una nueva imagen
mediaRoute.post('/', (req, res) => {
  const imageUrl = req.body.URL;
  const query = 'INSERT INTO Imagenes (URL, Pública, Categoría_ID, Álbum_ID) VALUES (?, true, 1, 1)';
  const params = [imageUrl];
  connection.query(query, params, (err, result) => {
    if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.send(`Se cargó la imagen "${imageUrl}" con éxito`);
    }
  });
});

// Actualizar una imagen por su URL
mediaRoute.put('/', (req, res) => {
  const imageUrl = req.body.URL;
  const newImageUrl = req.body.NewURL;
  const query = 'UPDATE Imagenes SET URL = ? WHERE URL = ?';
  const params = [newImageUrl, imageUrl];
  connection.query(query, params, (err, result) => {
    if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.send(`Se modificó la imagen "${imageUrl}" a "${newImageUrl}"`);
    }
  });
});

// Eliminar una imagen por su URL
mediaRoute.delete('/', (req, res) => {
  const imageUrl = req.body.URL;
  const query = 'DELETE FROM Imagenes WHERE URL = ?';
  connection.query(query, imageUrl, (err, result) => {
    if (result.affectedRows === 0) {
      res.status(404).send({
        message: 'Imagen no encontrada'
      });
    } else if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.send(`Se eliminó la imagen "${imageUrl}"`);
    }
  });
});

export default mediaRoute;