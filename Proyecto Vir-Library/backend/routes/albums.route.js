import { Router } from 'express';
import connection from '../connection/mysql.source.js';
const albumsRoute = Router();

// Obtener todos los álbumes
albumsRoute.get('/user', (req, res) => {
  const query = 'SELECT * FROM Albumes';
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

albumsRoute.get('/public', (req, res) => {
  const query = 'SELECT * FROM Albumes WHERE Publico = 1'; // Publico es una columna que indica si el álbum es público
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

// Crear un nuevo álbum
albumsRoute.post('/', (req, res) => {
  const albumName = req.body.Nombre;
  const isPublic = req.body.Publico || false;

  const query = 'INSERT INTO Albumes (Nombre, Publico, Fecha) VALUES (?, ?, NOW())';
  const params = [albumName, isPublic];

  connection.query(query, params, (err, result) => {
    if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.status(201).send({
        message: `Se creó el álbum "${albumName}" con éxito`
      });
    }
  });
});

// Actualizar un álbum por su ID
albumsRoute.put('/:id', (req, res) => {
  const albumId = req.params.id;
  const updatedName = req.body.Nombre;
  const isPublic = req.body.Publico;

  const query = 'UPDATE Albumes SET Nombre = ?, Publico = ? WHERE ID = ?';
  const params = [updatedName, isPublic, albumId];

  connection.query(query, params, (err, result) => {
    if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.send(`Se modificó el álbum con ID ${albumId}`);
    }
  });
});

// Eliminar un álbum por su ID
albumsRoute.delete('/:id', (req, res) => {
  const albumId = req.params.id;

  const query = 'DELETE FROM Albumes WHERE ID = ?';
  connection.query(query, albumId, (err, result) => {
    if (result.affectedRows === 0) {
      res.status(404).send({
        message: 'Álbum no encontrado'
      });
    } else if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.send(`Se eliminó el álbum con ID ${albumId}`);
    }
  });
});

// Cambiar la visibilidad del álbum
albumsRoute.put('/visibility/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const isPublic = req.body.isPublic; // Puedes enviar un valor booleano para establecer si el álbum es público o privado.

  // Realiza una consulta SQL para actualizar la visibilidad del álbum.
  const query = 'UPDATE Albumes SET Publico = ? WHERE ID = ?';
  const values = [isPublic, albumId];

  // Ejecuta la consulta en la base de datos.
  connection.query(query, values, (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error al actualizar la visibilidad del álbum' });
    } else {
      res.status(200).json({ message: 'Visibilidad del álbum actualizada con éxito' });
    }
  });
});

export default albumsRoute;