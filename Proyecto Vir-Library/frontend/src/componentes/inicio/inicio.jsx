import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div>
      <h1>Bienvenido a Vir-Library</h1>
      <p>
        Vir-Library es una plataforma donde puedes subir y gestionar tus álbumes de fotos de forma privada o pública. ¡Comparte tus recuerdos con amigos y familiares!
      </p>
      <div>
        <Link to="/registro">Registrarse</Link>
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    </div>
  );
}

export default Inicio;