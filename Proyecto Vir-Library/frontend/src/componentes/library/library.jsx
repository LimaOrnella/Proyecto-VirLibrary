import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Library() {
  const [userAlbums, setUserAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // Función para cargar imágenes al álbum seleccionado
  const uploadImage = () => {
    const formData = new FormData();
    formData.append('image', imageFile);

    axios.post(`/albums/${selectedAlbum.ID}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      // Actualizar la lista de imágenes en el álbum
      fetchAlbumImages();
    })
    .catch((error) => {
      console.error('Error al cargar la imagen', error);
    });
  };

  // Función para descargar una imagen
  const downloadImage = (imageId) => {
    window.open(`/albums/images/${imageId}`, '_blank');
  };

  // Función para obtener las imágenes en el álbum seleccionado
  const fetchAlbumImages = () => {
    if (selectedAlbum) {
      axios.get(`/albums/${selectedAlbum.ID}/images`)
      .then((response) => {
        setAlbumImages(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener imágenes del álbum', error);
      });
    }
  };

  // Función para cargar los álbumes del usuario
  const fetchUserAlbums = () => {
    axios.get('/albums/user')
      .then((response) => {
        setUserAlbums(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los álbumes del usuario', error);
      });
  };

  // Efecto para cargar los álbumes del usuario al cargar la página
  useEffect(() => {
    fetchUserAlbums();
  }, []);

  // Efecto para cargar las imágenes cuando se selecciona un álbum
  useEffect(() => {
    if (selectedAlbum) {
      fetchAlbumImages();
    }
  }, [selectedAlbum]);

  return (
    <div>
      <h1>Library</h1>
      <h2>Álbum seleccionado: {selectedAlbum ? selectedAlbum.Nombre : 'Ninguno'}</h2>

      <select onChange={(e) => setSelectedAlbum(JSON.parse(e.target.value))}>
        <option value={null}>Selecciona un álbum</option>
        {/* Recorrer los álbumes disponibles */}
        {userAlbums.map((album) => (
          <option key={album.ID} value={JSON.stringify(album)}>
            {album.Nombre}
          </option>
        ))}
      </select>

      {selectedAlbum && (
        <div>
          <h2>Imágenes en el álbum</h2>
          <ul>
            {albumImages.map((image) => (
              <li key={image.ID}>
                {image.URL}
                <button onClick={() => downloadImage(image.ID)}>Descargar</button>
              </li>
            ))}
          </ul>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button onClick={uploadImage}>Cargar Imagen</button>
        </div>
      )}
    </div>
  );
}

export default Library;