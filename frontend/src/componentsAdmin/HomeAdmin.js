import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function HomeAdmin(){
    return(
                   
            <Container fluid>
        <Row>
            <Col>
            <h1>Bienvenido al módulo de Administración</h1>
            </Col>
        </Row>
        <Row>
            <p>
                ¡Bienvenido al módulo de Administración de nuestra página web! Aquí podrás navegar y gestionar los distintos aspectos de nuestra plataforma.

                Utiliza las opciones del menú superior para cambiar entre las secciones de Usuarios, Laboratorios, Productos y Noticias. ¡Explora todas las funcionalidades que tenemos para ofrecerte!
            </p>
        </Row>
        <Row>
            <Col md={6} lg={3}>
            <Card bg={'secondary'} key={'secondary'} text={'white'} className="mb-2" style={{height: '200px' }} >
                <Card.Body>
                <Card.Title>Usuarios</Card.Title>
                <Card.Text>
                    Administra las cuentas de los usuarios de nuestra plataforma.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col md={6} lg={3}>
            <Card bg={'secondary'} key={'secondary'} text={'white'} className="mb-2" style={{ height: '200px' }}>
                <Card.Body>
                <Card.Title>Marcas propias</Card.Title>
                <Card.Text>
                    Actualiza la información de las marcas propias asociados a nuestra plataforma.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col md={6} lg={3}>
            <Card bg={'secondary'} key={'secondary'} text={'white'} className="mb-2" style={{ height: '200px' }}>
                <Card.Body>
                <Card.Title>Productos</Card.Title>
                <Card.Text>
                    Agrega, modifica y elimina los productos que ofrecemos.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col md={6} lg={3}>
            <Card bg={'secondary'} key={'secondary'} text={'white'} className="mb-2" style={{ height: '200px' }}>
                <Card.Body>
                <Card.Title>Noticias</Card.Title>
                <Card.Text>
                    Comparte noticias e información relevante con nuestros usuarios.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
       
       

    )
}