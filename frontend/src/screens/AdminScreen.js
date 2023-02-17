 import React from 'react'

 import '../assets/css/AdminScreen.css'
 import { useEffect,useState } from "react";

 import { Store } from '../Store';
 import { useContext } from 'react';

 import AppBarHead from '../components/AppBarHead';
 import AppSideBar from '../components/AppSideBar';
 
 import {Routes, Route} from 'react-router-dom'
 import Container from 'react-bootstrap/esm/Container';

 import UsuariosAdmin from '../componentsAdmin/UsuariosAdmin';
 import { useNavigate } from 'react-router-dom';

 

 export default function AdminScreen(){

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);   
    
    useEffect(() => {    
        
        //Validate exist token in store
        if(state.token === ''){
            navigate('/login');            
        }

    }, []);   

    //estados
    const [mostrar, setMostrar]= useState(false)

    useEffect(() => {
        if (mostrar) {         
          //console.log("mostrar has changed to true");
        }
    }, [mostrar]); // Only re-run the effect if mostrar changes
  
    var opciones = {
    titulo:'Pantallas',
    items:
    [
        {
            id:'0',
            tipo:'link',
            texto:'Usuarios',
            link:'/admin/usuarios'
        },
        {
            id:'1',
            tipo:'group',
            texto:'Productos',
            items:[{item:'productos1'},{item:'productos2'}]
        }
    ]
        
    };

    const activateOpcion = (e) => {
        //al activar la opcion muestra el contenido
        console.log('activateOpcion'+e);
        setMostrar(false)
    }

    return(
        <div>         
           
            <AppBarHead setMostrar={setMostrar}/>           

            <div className='d-flex mt-0'> 
                <AppSideBar mostrar={mostrar} opciones={opciones} activateOpcion={activateOpcion} setMostrar={setMostrar}/> 
                <Container className='sm-col-12'>
                    <h1>Admin</h1>
                    <Routes>
                        <Route path='/usuarios' element={<UsuariosAdmin/>} />
                    </Routes>
                </Container>
            </div>

        </div>
        
        
    )
 }