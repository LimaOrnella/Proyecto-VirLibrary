import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userAlbums, setUserAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Realiza una solicitud al servidor para obtener los datos del usuario y sus álbumes.
    fetch('http://localhost:8080/user') // Ajusta la ruta de la API según tu backend.
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setUserAlbums(data.albums);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error al cargar datos:', error));
  }, []);

  const handleLogout = () => {
    // Aquí puedes implementar la lógica para cerrar la sesión del usuario.
    // Por ejemplo, si estás utilizando tokens de autenticación, puedes eliminar el token de sesión.
  };

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h1>{user.username}'s Profile</h1>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/library">Crear Nuevo Álbum</Link>
          <Link to="/explore">Explorar Bibliotecas Públicas</Link>
          <h2>Tus Álbumes</h2>
          <ul>
            {userAlbums.map((album) => (
              <li key={album.id}>
                <h3>{album.name}</h3>
                <Link to={`/album/${album.id}`}>Ver Álbum</Link>
                <button>Editar</button>
                <button>Eliminar</button>
                <button>Privado/Público</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;