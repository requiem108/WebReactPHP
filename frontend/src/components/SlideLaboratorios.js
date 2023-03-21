import React, { useEffect, useState } from 'react';
import '../assets/css/SlideLaboratorios.css'
import axios from 'axios';

export default function SlideLaboratorios(){

    const [archivos, setArchivos] = useState([]);

    useEffect(() => {
        async function obtenerArchivos() {
          try {
            // Realiza una petición GET a la función PHP que lista los archivos
            const respuesta = await axios.get('/models/home.php?action=getLaboratorios');
    
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
            
                    <div className="slide">
                        <img key={indice} src={`../images/Laboratorios/${archivo}`} height="50"  alt="" />
                    </div> 
                ))}    
            </div>
        </div>
    )
}