import React from 'react';
import Axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import { Store } from '../Store';

export default function UsuariosAdmin() {
    const navigate = useNavigate();

    const {state, dispatch: ctxDispatch} = useContext(Store);

    //validamos si el token esta vacion regresa a login
    if(state.token === ''){
        navigate('/login');
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await Axios.post(`${state.url}usuarios.php`,
            {action: 'getUsuarios',
            usuario: state.usuario,
            token: state.token
            });
            console.log(data);
        }
        fetchData();
    }, [])

    return (
        <div>
            <h1>Usuarios</h1>
        </div>
    )
}