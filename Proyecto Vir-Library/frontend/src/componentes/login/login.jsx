import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState({ Nickname: '', Contraseña: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de inicio de sesión
    // Después de un inicio de sesión exitoso, redirige al usuario a otra página
    navigate('/home'); // Reemplaza '/profile' con la URL de la página de perfil
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <input
        type="text"
        name="Nickname"
        placeholder="Nombre de usuario"
        value={usuario.Nickname}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="Contraseña"
        placeholder="Contraseña"
        value={usuario.Contraseña}
        onChange={handleInputChange}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
}

export default Login;