 import React from 'react'
 import Axios from 'axios';

 import '../assets/css/AdminScreen.css'
 import { useEffect,useState } from "react";

 import { useSelector, useDispatch } from 'react-redux'


 import { Store} from '../Store';
 import { useContext } from 'react';

 import AppBarHead from '../components/AppBarHead';
 import AppSideBar from '../components/AppSideBar';
 
 import {Routes, Route} from 'react-router-dom'
 import Container from 'react-bootstrap/esm/Container';

 import UsuariosAdmin from '../componentsAdmin/UsuariosAdmin';
 import LaboratoriosAdmin from '../componentsAdmin/LaboratoriosAdmin';
 import ProductosAdmin from '../componentsAdmin/ProductosAdmin';
 import NoticiasAdmin from '../componentsAdmin/NoticiasAdmin';
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
    const [items, setItems]= useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                //Obtener las opciones de sidebar
                const {data} = await Axios.post(`${state.url}usuarios.php`, {
                    action: 'getPantallas',
                    usuario: state.usuario,
                    token: state.token,
                })
              setItems(data);

            } catch (error) {
              console.error(error);
            }
          };
        
          fetchData();
        
       

        if (mostrar) {         
          //console.log("mostrar has changed to true");
        }
    }, [mostrar]); // Only re-run the effect if mostrar changes
  
    var opciones = {
    titulo:'Pantallas',
    items: items        
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
                        <Route path='/laboratorios' element={<LaboratoriosAdmin/>} />
                        <Route path='/productos' element={<ProductosAdmin/>} />
                        <Route path='/noticias' element={<NoticiasAdmin/>} />
                    </Routes>
                </Container>
            </div>

        </div>
        
        
    )
 }