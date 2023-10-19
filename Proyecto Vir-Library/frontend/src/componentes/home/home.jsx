import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [publicAlbums, setPublicAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const userId = 1; // Reemplaza con el ID del usuario actual

  useEffect(() => {
    // Obtener álbumes públicos
    fetch('/albums/public')
      .then((response) => response.json())
      .then((data) => {
        setPublicAlbums(data);
      })
      .catch((error) => {
        console.error('Error al obtener álbumes públicos', error);
      });
  }, []);

  const loadComments = (albumId) => {
    // Obtener comentarios para el álbum seleccionado
    fetch(`/comments/${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error al obtener comentarios', error);
      });
  };

  const createComment = () => {
    // Crear un nuevo comentario
    if (selectedAlbum) {
      fetch('/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Texto: newComment,
          Album_ID: selectedAlbum.ID,
          Usuario_ID: userId, // Usamos el ID del usuario actual
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          loadComments(selectedAlbum.ID);
          setNewComment('');
        })
        .catch((error) => {
          console.error('Error al crear el comentario', error);
        });
    }
  };

  return (
    <div>
      <h1>Bienvenido a Vir-Library</h1>
      <h2>Bibliotecas Públicas</h2>
      <ul>
        {publicAlbums.map((album) => (
          <li key={album.ID}>
            {album.Nombre} - Creado por: {album.Usuario_ID}
            <button onClick={() => {
              setSelectedAlbum(album);
              loadComments(album.ID);
            }}>Ver Comentarios</button>
          </li>
        ))}
      </ul>

      <Link to="/profile">
        <button>Ir a Mi Perfil</button>
      </Link>

      {selectedAlbum && (
        <div>
          <h2>Comentarios para {selectedAlbum.Nombre}</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment.ID}>{comment.Texto}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Escribe un comentario"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={createComment}>Comentar</button>
        </div>
      )}
    </div>
  );
}

export default Home;