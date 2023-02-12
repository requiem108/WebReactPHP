import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import { Store } from '../Store';
import '../webComponents/tabla/main.js?v=4'
import '../webComponents/tabla/css/tabla.css?v=5'
import '../webComponents/Spin/css/spin.css?v=4'



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
              search:[{tipo:`input`,value:``,type:`text`,propierties:``}],
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
              search:[{tipo:`select`,value:``,propierties:``,
                options:[
                  {value:``,propierties:``,text:`Estado`},
                  {value:`A`,propierties:``,text:`Activo`},                
                  {value:`I`,propierties:``,text:`Inactivo`}
                  ]
              }],
              width:`20%`
            },
            {
              titulo:`Tipo de cuenta`,
              name:`tipo`,
              orderable:true,        
              search:[{tipo:`select`,value:``,propierties:``,
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
              
              width:`20%`       
            }
        
          ]

        return JSONTable;
    }

    useEffect(() => {
        /*
        const fetchData = async () => {
            /*const { data } = await Axios.post(`${state.url}usuarios.php`,
            {action: 'getUsuarios',
            usuario: state.usuario,
            token: state.token
            });
            //console.log(data);
        }
        fetchData();*/
        
        const JSONTable = getJsonTable();
        const tablaUC3G = document.querySelector('tabla-uc3g');
        tablaUC3G.data_personalizada = [
          {name:`action`,value:`getUsuarios`},
          {name:`token`,value: window.btoa(state.token)},
          {name:`usuario`,value: window.btoa(state.usuario)}
        ]
        tablaUC3G.url = `${state.url}usuarios.php`
        tablaUC3G.setEstructuraJson(JSONTable,true)
        
    }, [])

    
   
    

    return (
        <div>
            <h5>Cuentas de Usuario</h5>            
            <tabla-uc3g></tabla-uc3g>
        </div>
    )
}