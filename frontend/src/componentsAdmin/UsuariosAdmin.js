import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import { Store } from '../Store';
import '../webComponents/hellow.js'
import '../webComponents/tabla/main.js?v=4'

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
              name:`nombre`,
              orderable:true,
              bOrder:`asc`,
              search:[{tipo:`input`,value:``,type:`text`,propierties:``}],
              width:`50%`         
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
              titulo:`Avance`,
              name:`avance`,
              orderable:true,        
              search:[{tipo:`select`,value:``,propierties:``,
                options:[
                  {value:``,propierties:``,text:`TODOS`},
                  {value:`99.99`,propierties:``,text:`Menores a 100`},                
                  {value:`90.01`,propierties:``,text:`Menores a 90`},
                  {value:`80.01`,propierties:``,text:`Menores a 80`},
                  {value:`50.01`,propierties:``,text:`Menores a 50`}
                  ]
              }],  
              width:`15%`       
            },
            {
              titulo:``,
              name:``,
              orderable:false,       
              
              width:`15%`       
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
        debugger
        const JSONTable = getJsonTable();
        const tablaUC3G = document.querySelector('tabla-uc3g');
        tablaUC3G.url = `http://10.10.10.74/UC3G/views/tbl/mo17_tbl.php`
        tablaUC3G.setEstructuraJson(JSONTable,true)
        
    }, [])

    
   
    

    return (
        <div>
            <h1>Usuarios PRUEBAS</h1>
            <hello-world></hello-world>
            <tabla-uc3g></tabla-uc3g>
        </div>
    )
}