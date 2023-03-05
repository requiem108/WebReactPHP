import React from "react";

import { useEffect,useContext,useState } from 'react';
import { Store } from '../Store';
import Axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import ModalImg from "../components/ModalImg";


import '../webComponents/tabla/main.js?v=4'
import '../webComponents/tabla/css/tabla.css?v=5'
import '../webComponents/Spin/css/spin.css?v=4'
import '../webComponents/inputfetch/main.js?v=4'
import '../webComponents/inputfetch/css/inputfeth.css?v=4'
import '../webComponents/selectfetch/main.js?v=4'
import '../webComponents/textareafetch/main.js?v=4'

export default function ProductosAdmin() {

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const [urlImg, setUrlImg] = useState('');
    const [showModalImg, setShowModalImg] = useState(false);
    const [title, setTitle] = useState('');

    //validamos si el token esta vacion regresa a login
    if(state.token === ''){
       // navigate('/login');
    }
    const getJsonTable = () => {
        var JSONTable = [
            {
                titulo:` Descripcion corta`,
                name:`descripcion_corta`,
                orderable:true,
                bOrder:`asc`,
                search:[{tipo:`input`,value:``,type:`text`,properties:`style="width:70%;min-width:100px" class="tabla-filtrosAdm-uc3g"`}],
                width:`15%`         
            },
            {
                titulo:`Laboratorio`,
                name:`nombre`,
                orderable:true,
                bOrder:`asc`,
                search:[{tipo:`input`,value:``,type:`text`,properties:`style="width:70%;min-width:100px" class="tabla-filtrosAdm-uc3g"`}],
                width:`15%`         
            },
            {
                titulo:`Categoria`,
                name:`descripcion_categoria`,
                orderable:false,
                bOrder:`asc`,  
                search:[{tipo:`input`,value:``,type:`text`,properties:`style="width:70%;min-width:100px" class="tabla-filtrosAdm-uc3g"`}],            
                width:`15%`         
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
               
                width:`25%`         
            },
        ];
        return JSONTable;
    }

    useEffect(() => {      
        
        cargarProductos()
          
     }, [])

    const cargarProductos = async()=>{
      
        const JSONTable = getJsonTable();
        const tablaUC3G = document.querySelector('tabla-uc3g');
        tablaUC3G.data_personalizada = [
          {name:`action`,value:`getProductosAdmin`},
          {name:`token`,value: window.btoa(state.token)},
          {name:`usuario`,value: window.btoa(state.usuario)}
        ]
        tablaUC3G.url = `${state.url}productos.php`
        await tablaUC3G.setEstructuraJson(JSONTable,true) 
        tablaUC3G.functionSuccess = ()=>{addEventsBotones()}    
        //toast.error('Carga completa') 
    }

    const addEventsBotones = () => {
      btnSubirIMG()
      btnVerIMG()
      btnEliminar()
    }

    const addProducto = async() => {
        const tablaUC3G = document.querySelector('tabla-uc3g');
      try {
        const { data } = await Axios.post(`${state.url}productos.php`,{
          action: 'addProducto',
          usuario: state.usuario,
          token: state.token,
        });
        
        //toast.success('Usuario agregado correctamente')      
        await tablaUC3G.filtrar()       
        tablaUC3G.functionSuccess = ()=>{addEventsBotones()}  
        //toast.error('Usuario agregado correctamente') 
      } catch (err) {
        //toast.error(getError(err));
      }
    }

    const btnSubirIMG = async()=>{
       
      document.querySelectorAll('.admin-productos-img').forEach((btn)=>{
        btn.addEventListener('change',async (e)=>{
          e.preventDefault();
          subirImagen(e)
        })
      })
    }
    const btnVerIMG = async()=>{       
      document.querySelectorAll('.admin-products-img').forEach((btn)=>{
        btn.addEventListener('click',async (e)=>{
          e.preventDefault();          
          setUrlImg(e.target.dataset.img)
          setShowModalImg(true)
          setTitle(e.target.dataset.title)
        })
      })
    }
    const btnEliminar = async()=>{
      document.querySelectorAll('.admin-productos-eliminar').forEach((btn)=>{
        btn.addEventListener('click',async (e)=>{
          e.preventDefault();
          eliminarProducto(e)
        })
      })
    }

    const eliminarProducto = async(e) => {
      const tablaUC3G = document.querySelector('tabla-uc3g');
      try {
        const { data } = await Axios.post(`${state.url}productos.php`,{
          action: 'eliminarProducto',
          usuario: state.usuario,
          token: state.token,
          idProducto: e.target.dataset.id,
        });
        tablaUC3G.filtrar()
        //toast.success('Producto eliminado correctamente')
      } catch (err) {
        //toast.error(getError(err));
      }
    }

    //funcion para subir imagenes con Axios
    const subirImagen = async (e) => {
      debugger
      const tablaUC3G = document.querySelector('tabla-uc3g');
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('action', 'uploadImage');
      formData.append('usuario', state.usuario);
      formData.append('token', state.token);
      formData.append('idProducto', e.target.dataset.id);
      try {
        const { data } = await Axios.post(`${state.url}productos.php`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        await tablaUC3G.filtrar()       
        tablaUC3G.functionSuccess = ()=>{addEventsBotones()} 
        toast.success('Imagen subida correctamente')
      } catch (err) {
        toast.error(err);
      }
    };

    const handleClose = () => setShowModalImg(false);

    return (
      <div>    
          
        <Card className='p-1 m-1 admin '>
          <Card.Header className='d-flex justify-content-around flex-wrap'>
            <h5>Productos Administrador</h5> 
            <Button onClick={addProducto} className="btn">
              Agregar Producto
            </Button>
          </Card.Header>
          <Card.Body>                       
            <tabla-uc3g></tabla-uc3g>
          </Card.Body>
        </Card>
        <ModalImg urlImg={urlImg} showModalImg={showModalImg} handleClose={handleClose} title={title}/>
      </div>    
  );
}