 import React from 'react'

 import { Link,useNavigate } from 'react-router-dom';
 import { useEffect, useReducer,useState } from "react";

 import { Store } from '../Store';
 import { useContext } from 'react';

 import AppBarHead from '../components/AppBarHead';
 import AppSideBar from '../components/AppSideBar';
 

 

 export default function AdminScreen(){

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
   

    useEffect(() => {    
        
        //Validate exist token in store
        if(state.token === ''){
            //navigate('/login');            
        }

    }, []);   

    //estados
    const [mostrar, setMostrar]= useState(true)

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
                texto:'Noticias',
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
    }

    return(
        <div>         

            <AppBarHead setMostrar={setMostrar}/>           

            <div className='d-flex'> 
                <AppSideBar mostrar={mostrar} opciones={opciones} activateOpcion={activateOpcion} setMostrar={setMostrar}/> 
                <div>
                    <h1>Admin</h1>
                </div>
            </div>

        </div>
        
        
    )
 }