import React from 'react';
import { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet-async';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Store } from '../Store';
import { useCookies } from 'react-cookie';





export default function LoginScreen() {
    
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);  
    const [cookies, setCookie] = useCookies(['tokenmas']); 
    
    
    useEffect(() => {       
        //Validate exist token in cooky
        debugger
        if(state.token === ''){
            //debugger
            if(cookies.tokenmas !== undefined){
                let tokenc = cookies.tokenmas
                ctxDispatch({ type: 'SET_TOKEN', payload: tokenc.token });
                ctxDispatch({ type: 'SET_USUARIO', payload: tokenc.usuario });
                navigate('/admin');
            }                        
        }
    }, []);
    

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    
 

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
                setCookie('tokenmas', JSON.stringify({token:data.token,usuario:usuario}), { path: '/' });
                ctxDispatch({ type: 'SET_TOKEN', payload: data.token });
                ctxDispatch({ type: 'SET_USUARIO', payload: usuario });
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
            <h1 className="my-3 text-center">Administrador MAS MAS</h1>  
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