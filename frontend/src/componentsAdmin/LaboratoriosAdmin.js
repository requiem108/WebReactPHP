import React from "react";
import { useEffect,useContext } from 'react';
import { Store } from '../Store';
import Axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import '../webComponents/tabla/main.js?v=4'
import '../webComponents/tabla/css/tabla.css?v=5'
import '../webComponents/Spin/css/spin.css?v=4'
import '../webComponents/inputfetch/main.js?v=4'
import '../webComponents/inputfetch/css/inputfeth.css?v=4'
import '../webComponents/selectfetch/main.js?v=4'

export default function LaboratoriosAdmin({manejeadorError}) {

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    //validamos si el token esta vacion regresa a login
    if(state.token === ''){
      navigate('/login');
    }

    const getJsonTable = () => {
        var JSONTable = [
            {
                titulo:`Id`,
                name:`idLaboratorios`,
                orderable:true,
                bOrder:`asc`,
               
                width:`5%`         
            },
            {
                titulo:`Laboratorio`,
                name:`nombre`,
                orderable:true,
                bOrder:`asc`,
                search:[{tipo:`input`,value:``,type:`text`,properties:`class="tabla-filtrosAdm-uc3g"`}],
                width:`45%`         
            },
            {
                titulo:`Logo`,
                name:`logo`,
                orderable:false,
                bOrder:`asc`,  
                            
                width:`30%`         
            },
            {
                titulo:``,
                name:``,
                orderable:false,
                bOrder:`asc`,
               
                width:`20%`         
            },
        ];
        return JSONTable;
    }

    useEffect(() => {      
        
        cargarLaboratorios()
          
     }, [])

     const cargarLaboratorios = async()=>{
      
        const JSONTable = getJsonTable();
        const tablaUC3G = document.querySelector('tabla-uc3g');
        tablaUC3G.data_personalizada = [
          {name:`action`,value:`getLaboratorios`},
          {name:`token`,value: window.btoa(state.token)},
          {name:`usuario`,value: window.btoa(state.usuario)}
        ]
        tablaUC3G.url = `${state.url}laboratorios.php`
        await tablaUC3G.setEstructuraJson(JSONTable,true) 
        tablaUC3G.functionSuccess = (respuesta)=>{addEventsBotones(respuesta)}    
        toast.success('Carga completa') 
    }

    const addEventsBotones = async(respuesta)=>{
      debugger
      if(respuesta.ERROR === 'ERROR'){
        manejeadorError(respuesta.error)
      }else{
        inpustFunctionError()
        btnEliminarLab()
        btnSubirLogo()
      }
      
    }

    const inpustFunctionError = async()=>{
      let lista = document.querySelectorAll(`tabla-uc3g input`)
      lista.forEach((input)=>{
        if(input.functionError !== null){
          input.functionError = (message)=>{manejeadorError(message)}
        }
      })
    }

    const addLaboratorio = async()=>{
      
      const tablaUC3G = document.querySelector('tabla-uc3g');
      try {
        const { data } = await Axios.post(`${state.url}laboratorios.php`,{
          action: 'addLaboratorio',
          usuario: state.usuario,
          token: state.token,
        });
        debugger
        if(data.error !==''){
          throw new Error(data.error)
        }

        toast.success('Laboratorio agregado correctamente')      
        await tablaUC3G.filtrar()       
        tablaUC3G.functionSuccess = ()=>{addEventsBotones()}          
      } catch ({message}) {        
        manejeadorError(message)
      }
    }

    const btnEliminarLab = async()=>{
      
      document.querySelectorAll('.admin-Lab-eliminar').forEach((btn)=>{
        btn.addEventListener('click',async (e)=>{
          e.preventDefault();
          
          const tablaUC3G = document.querySelector('tabla-uc3g');
          try {
            const { data } = await Axios.post(`${state.url}laboratorios.php`,{
              action: 'deleteLaboratorio',
              usuario: state.usuario,
              token: state.token,
              idLaboratorios: e.target.dataset.id
            });
            
            toast.success('Laboratorio eliminado')      
            await tablaUC3G.filtrar()       
            tablaUC3G.functionSuccess = ()=>{addEventsBotones()}  
            
          } catch (err) {
            manejeadorError(err)
          }
        })
      })
    }

    const btnSubirLogo = async()=>{
        
        document.querySelectorAll('.admin-Lab-logo').forEach((btn)=>{
          btn.addEventListener('change',async (e)=>{
            e.preventDefault();
            subirImagen(e)
          })
        })
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
      formData.append('idLaboratorios', e.target.dataset.id);
      try {
        const { data } = await Axios.post(`${state.url}laboratorios.php`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        await tablaUC3G.filtrar()       
        tablaUC3G.functionSuccess = ()=>{addEventsBotones()} 
        toast.success('Imagen subida correctamente')
      } catch (err) {
        manejeadorError(err)
      }
    };

  return (
    <Card className='p-1 m-1 admin '>
        <Card.Header className='d-flex justify-content-around flex-wrap'>
          <h5>Laboratorios Administrador</h5> 
          <Button onClick={addLaboratorio} className="btn">
            Agregar Laboratorio
          </Button>
        </Card.Header>
        <Card.Body>                       
          <tabla-uc3g></tabla-uc3g>
        </Card.Body>
    </Card>
  );
}