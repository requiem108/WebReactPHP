import React,{ useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../assets/css/ProductosScreen.css'
import { Store } from '../Store';
import axios from 'axios';
import { toast } from 'react-toastify';

//PAra la tabla de productos
import '../webComponents/tabla/main.js?v=4'
import '../webComponents/tabla/css/tabla.css?v=5'
import '../webComponents/Spin/css/spin.css?v=4'
import '../webComponents/inputfetch/main.js?v=4'
import '../webComponents/inputfetch/css/inputfeth.css?v=4'
import '../webComponents/selectfetch/main.js?v=4'
import '../webComponents/textareafetch/main.js?v=4'
import { useNavigate } from 'react-router-dom';
import ModalImg from "../components/ModalImg";

export default function  ProductsScreen() {

  const [archivos, setArchivos] = useState([]);
  const [urlImg, setUrlImg] = useState('');
  const [showModalImg, setShowModalImg] = useState(false);
    const [title, setTitle] = useState('');
  const {state, dispatch: ctxDispatch} = useContext(Store);

  const getJsonTable = () => {
    var JSONTable = [
        {
            titulo:` Descripcion corta`,
            name:`pr.descripcion_corta`,
            orderable:true,
            bOrder:`asc`,
            
            width:`20%`         
        },
        {
            titulo:`Marca`,
            name:`lab.nombre`,
            orderable:true,
            bOrder:`asc`,
            search:[{tipo:`input`,value:``,type:`text`,properties:`style="width:70%;min-width:100px" class="tabla-filtrosAdm-uc3g"`}],
            width:`20%`         
        },
        {
            titulo:`Categoria`,
            name:`ca.descripcion`,
            orderable:false,
            bOrder:`asc`,  
            search:[{tipo:`input`,value:``,type:`text`,properties:`style="width:70%;min-width:100px" class="tabla-filtrosAdm-uc3g"`}],            
            width:`20%`         
        },            
        {
            titulo:`Descripcion`,
            name:`descripcion`,
            orderable:false,
            bOrder:`asc`,
           
            width:`30%`         
        },
        {
            titulo:``,
            name:``,
            orderable:false,
            bOrder:`asc`,
           
            width:`10%`         
        },
    ];
    return JSONTable;
  }

  useEffect(() => {
    async function obtenerArchivos() {
      try {
        // Realiza una petición GET a la función PHP que lista los archivos
        const respuesta = await axios.get(`${state.url}Home.php?action=getCategorias`);
       
        // Si la petición fue exitosa, actualiza el estado con la lista de archivos
        setArchivos(respuesta.data);
      } catch (error) {
        console.error(error);
      }
    }

    obtenerArchivos();
    cargarProductos();
  }, []);

  const cargarProductos = async()=>{
      
    const JSONTable = getJsonTable();
    const tablaUC3G = document.querySelector('tabla-uc3g');
    tablaUC3G.data_personalizada = [
      {name:`action`,value:`getProductosWeb`},      
    ]
    tablaUC3G.url = `${state.url}productos.php`
    await tablaUC3G.setEstructuraJson(JSONTable,true) 
    
    tablaUC3G.functionSuccess = (respuesta)=>{addEventsBotones(respuesta)}    
    toast.success('Carga completa') 
  }

  const addEventsBotones = (respuesta) => {
      
    if(respuesta.ERROR === 'ERROR'){        
      toast.error(respuesta.error)
    }else{
      btnVerIMG()
    }
  }

  const btnVerIMG = async()=>{       
    document.querySelectorAll('.producto-img-btn').forEach((btn)=>{
      btn.addEventListener('click',async (e)=>{
        e.preventDefault();                  
        setUrlImg(e.target.dataset.img)
        setShowModalImg(true)
        setTitle(e.target.dataset.title)
      })
    })
  }

  const handleClose = () => setShowModalImg(false);

  return (
    <Container fluid>
      <Row className="Productos-bordeSuperior py-3 justify-content-center">
        <h2 className="text-center" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
          Productos
        </h2>
      </Row>
      <Row className="Productos-contenedorImagenes py-3">
        {archivos.map((archivo, indice) => (
          <Col  key={indice} className="d-flex justify-content-center flex-column align-items-center ">
            <Image src={`${state.url}../images/Categorias/${archivo}`} thumbnail />
            <p>{archivo.split('.')[0].charAt(0).toUpperCase()+archivo.split('.')[0].slice(1)}</p>
          </Col>
        ))}
      </Row>
      <Row className="Productos-filtraBusqueda py-3 justify-content-center">
        <h3 className="text-center">Filtra tu búsqueda</h3>
      </Row>
      <Row className="Productos-espacioComponente py-3">
        {/* Espacio para el componente */}
        <tabla-uc3g></tabla-uc3g>
      </Row>

      <ModalImg urlImg={urlImg} showModalImg={showModalImg} handleClose={handleClose} title={title}/>
    </Container>
  );
};

