import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './componentes/Header/Header';
import Tabla from './componentes/Tabla/Tabla';
import Usuario from './componentes/Usuario/Usuario';
import AgregarColab from './componentes/AgregarColab/AgregarColab';
import UpdateColab from './componentes/UpdateColab/UpdateColab';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <HashRouter>
    <Routes>
      <Route path="/" element={
        <div>
          <Header/>
          <Tabla />
        </div>
      }/>
      <Route path="/Colaborador" element={
        <div>
          <Header/>
          <Usuario/>
        </div>
      }/>
      <Route path="/AgregarColaborador" element={
        <div>
          <Header/>
          <AgregarColab/>
        </div>
      }/>
      <Route path="/UpdateColaborador" element={
        <div>
          <Header/>
          <UpdateColab/>
        </div>
      }/>
    </Routes>
  </HashRouter>
);
