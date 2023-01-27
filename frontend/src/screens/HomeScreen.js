import React from "react";
import AppBarHeadWeb from '../components/AppBarHeadWeb';
import SlideHome from "../components/SlideHome";

import '../assets/css/ScreenHome.css';

import { useEffect, useReducer,useState } from "react";

export default  function HomeScreen(props) {
  //estados
  const [mostrar, setMostrar]= useState(true)

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
            link:'/Productos'
        },
        {
            id:'4',
            tipo:'link',
            texto:'Contactos',
            link:'/Productos'
        }
    ]
        
    };
  
    return (
        <div>
          <AppBarHeadWeb setMostrar={setMostrar} opciones={opciones}/> 
          <SlideHome/> 
          <h1>Home Screen</h1>
        </div>
    );
}