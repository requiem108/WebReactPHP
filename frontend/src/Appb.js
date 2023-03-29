
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

import AppBarHeadWeb from './components/AppBarHeadWeb';
import AppSideBarWeb from './components/AppSideBarWeb';
import AppFooterWeb from './components/AppFooterWeb';

import { useEffect,useState } from "react";
import ProductsScreen from './screens/ProductsScreen';
import SomosScreen from './screens/SomosScreen';

import { ToastContainer } from 'react-toastify';

function AdminLayout({ children }) {
  return (
    <Container fluid className='p-0 p-lg-2 main-container'>
      {children}
    </Container>
  );
}

function App() {
  //estados
  const [mostrar, setMostrar]= useState(true)
  //estados de los links
  const [marcar, setMarcar]= useState('Inicio')

  const srcAdmin = ['/admin','/login'];

  //console.log(window.location.pathname.substring(0,6))

  useEffect(() => {
    debugger
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
    debugger
  return (
    
    <HashRouter> 
       <ToastContainer position="bottom-center" limit={1} />
      { !srcAdmin.includes(window.location.pathname.substring(0,6))?       
        <div> 
          <div className="App">
            <i className="fas fa-chevron-circle-down"></i>
            <AppBarHeadWeb setMostrar={setMostrar} opciones={opciones} marcar={marcar} setMarcar={setMarcar}/> 
          </div> 
          <Container className='d-md-none'>
            <AppSideBarWeb mostrar={mostrar} setMostrar={setMostrar} opciones={opciones} marcar={marcar} setMarcar={setMarcar}/>
          </Container>
          
          <main> 
            <Container fluid className='p-0 p-lg-2 main-container'>        
              <Routes>
                <Route path="/" element={<HomeScreen setMarcar={setMarcar}/>} />
                <Route path="/somos" element={<SomosScreen/>} />
                <Route path="/productos" element={<ProductsScreen/>} />
                <Route path="/noticias" element={<NoticiasScreen/>} /> 
                <Route path="/contacto" element={<ContactoScreen/>} />                  
              </Routes>
            </Container> 
          </main> 

          <Container className='' fluid>
            <AppFooterWeb />         
          </Container>
        </div>

        :
 
      <main>      

        <Container fluid className='p-0 p-lg-2 main-container'>        
          <Routes>   
            <Route path="/" element={<LoginScreen />} />                   
            <Route path="/login" element={<LoginScreen />} />   
            <Route path="/admin/*" element={<AdminScreen />} />                           
          </Routes>
        </Container>     
          
      </main>   
      }
    </HashRouter>
   
  );
}

export default App;
