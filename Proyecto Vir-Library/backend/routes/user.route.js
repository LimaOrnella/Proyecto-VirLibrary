import { Router } from 'express';
import connection from '../connection/mysql.source.js';
const userRoute = Router();

// Obtener todos los usuarios
userRoute.get('/', (req, res) => {
  const query = 'SELECT * FROM Usuarios';
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

// Crear un nuevo usuario
userRoute.post('/', (req, res) => {
  const query = 'INSERT INTO Usuarios (Nickname, Contraseña, Email) VALUES (?, ?, ?)';
  const insertar_persona = [req.body.Nickname, req.body.Contraseña, req.body.Email];
  connection.query(query, insertar_persona, (err, result) => {
    if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err,
      });
    } else {
      res.status(201).send({
        message: `Se creó el usuario ${req.body.Nickname} con éxito`,
      });
    }
  });
});

// Iniciar sesión
userRoute.post('/login', (req, res) => {
  const { Nickname, Contraseña } = req.body;
  const query = 'SELECT * FROM Usuarios WHERE Nickname = ? AND Contraseña = ?';
  connection.query(query, [Nickname, Contraseña], (err, rows) => {
    if (err) {
      res.status(500).send({ message: 'Error del servidor', detail: err });
    } else {
      if (rows.length === 1) {
        // Las credenciales son correctas
        res.status(200).send({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).send({ message: 'Credenciales incorrectas' });
      }
    }
  });
});

// Actualizar un usuario
userRoute.put('/', (req, res) => {
  const query = 'UPDATE Usuarios SET Nickname = ?, Contraseña = ? WHERE Nickname = ?';
  const insertar_persona = [req.body.Nickname, req.body.Contraseña, req.body.Nickname];
  connection.query(query, insertar_persona, (err, result) => {
    if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      res.send(`Se modificó el usuario a ${req.body.Nickname}`);
    }
  });
});

// Eliminar un usuario
userRoute.delete('/', (req, res) => {
  const query = 'DELETE FROM Usuarios WHERE Nickname = ?';
  const insertar_Usuarios = [req.body.Nickname];
  connection.query(query, insertar_Usuarios, (err, result) => {
    if (err) {
      res.status(500).send({
        message: 'Error del servidor',
        detail: err
      });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send({
          message: 'Usuario no encontrado'
        });
      } else {
        res.send({
          message: `Se eliminó al usuario ${req.body.Nickname}`
        });
      }
    }
  });
});

export default userRoute;