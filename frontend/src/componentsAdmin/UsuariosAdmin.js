import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import { Store } from '../Store';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { getError } from '../utils';

import '../webComponents/tabla/main.js?v=4'
import '../webComponents/tabla/css/tabla.css?v=5'
import '../webComponents/Spin/css/spin.css?v=4'
import '../webComponents/inputfetch/main.js?v=4'
import '../webComponents/inputfetch/css/inputfeth.css?v=4'
import '../webComponents/selectfetch/main.js?v=4'



export default function UsuariosAdmin() {
    //const navigate = useNavigate();

    const {state, dispatch: ctxDispatch} = useContext(Store);

    //validamos si el token esta vacion regresa a login
    if(state.token === ''){
       // navigate('/login');
    }

    const getJsonTable = () => {

        var JSONTable = [
            {
              titulo:`Usuario`,
              name:`usuario`,
              orderable:true,
              bOrder:`asc`,
              search:[{tipo:`input`,value:``,type:`text`,properties:`class="tabla-filtrosAdm-uc3g"`}],
              width:`20%`         
            },
            {
              titulo:`clave`,
              name:`clave`,
              orderable:false,              
              
              width:`20%`         
            },
            {
              titulo:`Estado`,
              name:`estado`,
              orderable:true,
              value:``,
              search:[{tipo:`select`,value:``,properties:`class="tabla-filtrosAdm-uc3g"`,
                options:[
                  {value:``,propierties:``,text:`Estado`},
                  {value:`A`,propierties:``,text:`Activo`},                
                  {value:`I`,propierties:``,text:`Inactivo`}
                  ]
              }],
              width:`30%`
            },
            {
              titulo:`Tipo de cuenta`,
              name:`tipo`,
              orderable:true,        
              search:[{tipo:`select`,value:``,properties:` class="tabla-filtrosAdm-uc3g"`,
                options:[
                  {value:``,propierties:``,text:`TODOS`},
                  {value:`administrador`,propierties:``,text:`Administrador`},                
                  {value:`invitado`,propierties:``,text:`Invitado`}
                 
                  ]
              }],  
              width:`20%`       
            },
            {
              titulo:``,
              name:``,
              orderable:false,       
              
              width:`10%`       
            }
        
          ]

        return JSONTable;
    }

    useEffect(() => {      
        
       cargarUsuarios()
         
    }, [])

    const cargarUsuarios = async()=>{
      const JSONTable = getJsonTable();
      const tablaUC3G = document.querySelector('tabla-uc3g');
      tablaUC3G.data_personalizada = [
        {name:`action`,value:`getUsuarios`},
        {name:`token`,value: window.btoa(state.token)},
        {name:`usuario`,value: window.btoa(state.usuario)}
      ]
      tablaUC3G.url = `${state.url}usuarios.php`
      await tablaUC3G.setEstructuraJson(JSONTable,true) 
      tablaUC3G.functionSuccess = ()=>{btnEliminarConfig() }   
      //toast.error('Carga completa') 
    }

    const addUsuario = async()=>{
      
      const tablaUC3G = document.querySelector('tabla-uc3g');
      try {
        const { data } = await Axios.post(`${state.url}usuarios.php`,{
          action: 'addUser',
          usuario: state.usuario,
          token: state.token,
        });
        
        //toast.success('Usuario agregado correctamente')      
        await tablaUC3G.filtrar()
        document.querySelectorAll('mas-admin-usuarios').forEach((element) => {
          element.url = `${state.url}usuarios.php`
        })
        //toast.error('Usuario agregado correctamente') 
      } catch (err) {
        //toast.error(getError(err));
      }
    }
     
    const btnEliminarConfig = () => {
      document.querySelectorAll('.admin-user-eliminar').forEach((element) => {
        element.addEventListener('click', async (e) => {
          e.preventDefault();
          const tablaUC3G = document.querySelector('tabla-uc3g');
          const { data } = await Axios.post(`${state.url}usuarios.php`,{
            action: 'deleteUser',
            usuario: state.usuario,
            token: state.token,
            id: e.target.dataset.id,
          });
          toast.success('Usuario eliminado correctamente')      
          await tablaUC3G.filtrar()
        })
      })//fin del foreach
    }
    

    return (
      <Card className='p-1 m-1 admin '>
        <Card.Header className='d-flex justify-content-around flex-wrap'>
          <h5>Cuentas de Usuario Administrador</h5> 
          <Button onClick={addUsuario} className="btn">
            Agregar Usuario
          </Button>
        </Card.Header>
        <Card.Body>                       
          <tabla-uc3g></tabla-uc3g>
        </Card.Body>
    </Card>
    )
}