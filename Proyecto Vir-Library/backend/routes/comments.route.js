import { Router } from 'express';
import connection from '../connection/mysql.source.js';

const commentsRoute = Router();

// Obtener comentarios por el ID del álbum
commentsRoute.get('/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const query = 'SELECT * FROM Comentarios WHERE Album_ID = ?';
  connection.query(query, [albumId], (err, rows) => {
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

// Crear un nuevo comentario
commentsRoute.post('/', (req, res) => {
  const { Texto, Album_ID, Usuario_ID } = req.body;
  const query = 'INSERT INTO Comentarios (Texto, Album_ID, Usuario_ID, Oculto) VALUES (?, ?, ?, false)';
  const values = [Texto, Album_ID, Usuario_ID];
  connection.query(query, values, (err, result) => {
    if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.status(201).send({
        message: 'Comentario creado con éxito'
      });
    }
  });
});

// Actualizar un comentario por su ID
commentsRoute.put('/:comentarioId', (req, res) => {
  const comentarioId = req.params.comentarioId;
  const { Texto, Oculto } = req.body;
  const query = 'UPDATE Comentarios SET Texto = ?, Oculto = ? WHERE ID = ?';
  const values = [Texto, Oculto, comentarioId];
  connection.query(query, values, (err, result) => {
    if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.send('Comentario actualizado con éxito');
    }
  });
});

// Eliminar un comentario por su ID
commentsRoute.delete('/:comentarioId', (req, res) => {
  const comentarioId = req.params.comentarioId;
  const query = 'DELETE FROM Comentarios WHERE ID = ?';
  connection.query(query, comentarioId, (err, result) => {
    if (result.affectedRows === 0) {
      res.status(404).send({
        message: 'Comentario no encontrado'
      });
    } else if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.send('Comentario eliminado con éxito');
    }
  });
});

// Cambiar la visibilidad de un comentario por su ID
commentsRoute.put('/comment/visibility/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  const { isVisible } = req.body; // Puedes enviar un valor booleano para establecer si el comentario está visible u oculto.

  // Realiza una consulta SQL para actualizar la visibilidad del comentario.
  const query = 'UPDATE Comentarios SET Oculto = ? WHERE ID = ?';
  const values = [isVisible, commentId];

  // Ejecuta la consulta en la base de datos.
  connection.query(query, values, (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error al actualizar la visibilidad del comentario' });
    } else {
      res.status(200).json({ message: 'Visibilidad del comentario actualizada con éxito' });
    }
  });
});

export default commentsRoute;