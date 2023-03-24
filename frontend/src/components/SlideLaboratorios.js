import React, { useEffect, useState, useContext } from 'react';
import { Store } from '../Store';
import '../assets/css/SlideLaboratorios.css'
import axios from 'axios';

export default function SlideLaboratorios(){

    const [archivos, setArchivos] = useState([]);
    const {state, dispatch: ctxDispatch} = useContext(Store);

    useEffect(() => {
        async function obtenerArchivos() {
          try {
            // Realiza una petición GET a la función PHP que lista los archivos
            const respuesta = await axios.get(`${state.url}Home.php?action=getLaboratorios`);
           
            // Si la petición fue exitosa, actualiza el estado con la lista de archivos
            setArchivos(respuesta.data);
          } catch (error) {
            console.error(error);
          }
        }
    
        obtenerArchivos();
    }, []);

    return(
        <div className="laboratorio-slider">
            <div className="slide-track">
                {archivos.map((archivo, indice) => (          
            
                    <div className="slide" key={indice}>
                        <img src={`${state.url}../images/Laboratorios/${archivo}`} height="50"  alt="" />
                    </div> 
                ))}    
            </div>
        </div>
    )
}