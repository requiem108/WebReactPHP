import React from 'react';
import { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet-async';
import Axios from 'axios';
import { useState } from 'react';
import { Store } from '../Store';


export default function LoginScreen() {
    const navigate = useNavigate();
    //const { search } = useLocation();
    //const redirectInUrl = new URLSearchParams(search).get('redirect');
    

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    
    const {state, dispatch: ctxDispatch} = useContext(Store);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const {data} = await Axios.post(`${state.url}login.php`, {
                usuario,
                password,
                action :'login',
            });
            debugger
            if(data.comentario === 'Exito'){
                ctxDispatch({ type: 'SET_TOKEN', payload: data.token });
                navigate('/admin');
            }else{                
                setMensaje(data.comentario);
            }
            
            
            
        } catch (error) {
            //return <Redirect to="/login" /> 
        }
    }

    return(
        <Container className="small-container col-md-6 col-xl-4">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <h1 className="my-3 text-center">Administrador</h1>  
            <Link to="/"><i className="fas fa-home">Ir a la pagina web</i></Link>     
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="usuario">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" required onChange={(e)=> setUsuario(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required onChange={(e)=> setPassword(e.target.value)} />
                </Form.Group>
                <div className="mb-3">
                <Button type="submit">Ingresar</Button>
                </div>
                <div className="mb-3">    
                
                </div>
            </Form>
            {mensaje !== ''? <Alert variant="danger">{mensaje}</Alert>:null}
        </Container>
    )
}