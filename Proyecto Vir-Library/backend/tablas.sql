CREATE DATABASE tpf_2;
USE tpf_2;
-- Tabla de Usuarios
CREATE TABLE Usuarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nickname VARCHAR(50) NOT NULL UNIQUE,
    Contraseña VARCHAR(255) NOT NULL,
    Email VARCHAR(100) NOT NULL
);

-- Tabla de Álbumes con la columna Publico
CREATE TABLE Albumes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Fecha DATE NOT NULL,
    Usuario_ID INT,
    Publico BOOLEAN NOT NULL,
    FOREIGN KEY (Usuario_ID) REFERENCES Usuarios(ID)
);

-- Tabla de Categorías
CREATE TABLE Categorias (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

-- Insertar Categorías
INSERT INTO Categorias (Nombre) VALUES
    ('Naturaleza'),
    ('Autos'),
    ('Familia'),
    ('Arte'),
    ('Peliculas'),
    ('Alimentos'),
    ('Moda'),
    ('Tecnologia'),
    ('Anime'),
    ('Otro');

-- Tabla de Imágenes
CREATE TABLE Imagenes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    URL VARCHAR(255) NOT NULL,
    Pública BOOLEAN NOT NULL,
    Categoría_ID INT NOT NULL,
    Álbum_ID INT NOT NULL,
    FOREIGN KEY (Categoría_ID) REFERENCES Categorias(ID),
    FOREIGN KEY (Álbum_ID) REFERENCES Albumes(ID)
);

-- Tabla de Comentarios relacionada con la tabla Albumes
CREATE TABLE Comentarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Texto TEXT NOT NULL,
    Oculto BOOLEAN NOT NULL,
    Album_ID INT NOT NULL,  -- Usar Album_ID en lugar de Imagen_ID
    Usuario_ID INT NOT NULL,
    FOREIGN KEY (Album_ID) REFERENCES Albumes(ID),  -- FK para álbumes
    FOREIGN KEY (Usuario_ID) REFERENCES Usuarios(ID)
);