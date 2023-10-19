import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Registro() {
  const [usuario, setUsuario] = useState({
    Nickname: '',
    contraseña: '',
    Email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleRegistro = () => {
    fetch('http://localhost:8080/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nickname: usuario.Nickname,
        contraseña: usuario.contraseña,
        Email: usuario.Email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parsea la respuesta como JSON
        } else {
          throw new Error('Error en el registro'); // Lanza un error en caso de una respuesta no exitosa
        }
      })
      .then((data) => {
        // La respuesta fue exitosa, muestra un mensaje
        alert(data.message);
        // Redirige al usuario a la página de inicio
        window.location = '/';
      })
      .catch((error) => {
        // Maneja errores o muestra un mensaje de error
        alert(error.message);
      });
  };

  return (
    <div>
      <h1>Registro</h1>
      <form>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="Nickname"
            value={usuario.Nickname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={usuario.contraseña}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="text"
            name="Email"
            value={usuario.Email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="button" onClick={handleRegistro}>
            Registrarse
          </button>
        </div>
      </form>
      <div>
        <Link to="/login">¿Ya tienes una cuenta? Iniciar sesión</Link>
      </div>
    </div>
  );
}

export default Registro;