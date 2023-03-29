
import './App.css';
import {BrowserRouter,HashRouter,Routes, Route} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import React  from 'react';

import LoginScreen from "./screens/LoginScreen";
import AdminScreen from "./screens/AdminScreen";
import HomeScreen from "./screens/HomeScreen";
import NoticiasScreen from "./screens/NoticiasScreen";
import ContactoScreen from "./screens/ContactoScreen";
import '@coreui/coreui/dist/css/coreui.min.css'

import HomeAdmin from './componentsAdmin/HomeAdmin';
import UsuariosAdmin from './componentsAdmin/UsuariosAdmin';
import LaboratoriosAdmin from './componentsAdmin/LaboratoriosAdmin';
import ProductosAdmin from './componentsAdmin/ProductosAdmin';
import NoticiasAdmin from './componentsAdmin/NoticiasAdmin';



import { useEffect,useState } from "react";
import ProductsScreen from './screens/ProductsScreen';
import SomosScreen from './screens/SomosScreen';

import { ToastContainer } from 'react-toastify';

import WebLayout from './components/WebLayout';

function App() {
  //estados
  const [mostrar, setMostrar]= useState(true)
  //estados de los links
  const [marcar, setMarcar]= useState('Inicio')

  const srcAdmin = ['/admin','/login'];

  //console.log(window.location.pathname.substring(0,6))

  useEffect(() => {
  
      if (mostrar) {      
        
      }
    }, [mostrar]); // Only re-run the effect if mostrar changes

    var opciones = {
    titulo:'Pantallas',
    items:
    [
        {
            id:'0',
            tipo:'link',
            texto:'Inicio',
            link:'/'
        },
        {
            id:'1',
            tipo:'link',
            texto:'Somos',
            link:'/Somos'
            
        },
        {
            id:'2',
            tipo:'link',
            texto:'Productos',
            link:'/Productos'
        },
        {
            id:'3',
            tipo:'link',
            texto:'Noticias',
            link:'/Noticias'
        },
        {
            id:'4',
            tipo:'link',
            texto:'Contacto',
            link:'/Contacto'
        }
    ],
    
        
    };
    
    return (
        <HashRouter>
          <ToastContainer position="bottom-center" limit={1} />
          <Routes>
            <Route path="/" index element={<WebLayout mostrar={mostrar} setMostrar={setMostrar} opciones={opciones} marcar={marcar} setMarcar={setMarcar}><HomeScreen /></WebLayout>} />
            <Route path="/somos" element={<WebLayout mostrar={mostrar} setMostrar={setMostrar} opciones={opciones} marcar={marcar} setMarcar={setMarcar}><SomosScreen /></WebLayout>} />
            <Route path="/productos" element={<WebLayout mostrar={mostrar} setMostrar={setMostrar} opciones={opciones} marcar={marcar} setMarcar={setMarcar}><ProductsScreen /></WebLayout>} />
            <Route path="/noticias" element={<WebLayout mostrar={mostrar} setMostrar={setMostrar} opciones={opciones} marcar={marcar} setMarcar={setMarcar}><NoticiasScreen /></WebLayout>} />
            <Route path="/contacto" element={<WebLayout mostrar={mostrar} setMostrar={setMostrar} opciones={opciones} marcar={marcar} setMarcar={setMarcar}><ContactoScreen /></WebLayout>} />
    
            <Route path="/login" element={<LoginScreen />} />
            
            <Route path='/admin' element={<AdminScreen><HomeAdmin/></AdminScreen>} />
            <Route path='/admin/usuarios' element={<AdminScreen><UsuariosAdmin/></AdminScreen>} />
            <Route path='/admin/marcas' element={<AdminScreen><LaboratoriosAdmin/></AdminScreen>} />
            <Route path='/admin/productos' element={<AdminScreen><ProductosAdmin/></AdminScreen>} />
            <Route path='/admin/noticias' element={<AdminScreen><NoticiasAdmin/></AdminScreen>} />
    
            {/* Redireccionar rutas desconocidas al Home */}
            
          </Routes>
        </HashRouter>
      );
}

export default App;
