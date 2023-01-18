import React from 'react';
import { useContext, useEffect, useReducer } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Axios from 'axios';
import { useState } from 'react';
import { Store } from '../Store';

export default function LoginScreen() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    
    const {state, dispatch: ctxDispatch} = useContext(Store);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const {data} = await Axios.post(state.url, {
                usuario,
                password,
                action :'login',
            });
            
        } catch (error) {
        }
    }

    return(
        <Container className="small-container col-md-6 col-xl-4">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <h1 className="my-3 text-center">Administrador</h1>
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
        </Container>
    )
}