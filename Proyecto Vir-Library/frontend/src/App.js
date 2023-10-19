import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Inicio from './componentes/inicio/inicio';
import Login from './componentes/login/login';
import Registro from './componentes/register/register';
import Profile from './componentes/profile/profile';
import Home from './componentes/home/home'; // Cambia "inicio" a "Home" para que coincida

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* Cambia "Inicio" a "Home" para que coincida con la importación */}
        <Route path="/profile" element={<Profile />} />
        {/* Agrega rutas para otros componentes si es necesario */}
      </Routes>
    </Router>
  );
}

export default App;