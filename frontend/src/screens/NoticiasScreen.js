import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NoticiasWeb from '../components/NoticiasWeb';

export default function NoticiasScreen() {
    return (
    <Container fluid className='p-5'>
        <Row col={12} className='border border-warning border-2 border-top-0 border-start-0 border-end-0 '>
            <h2 className='text-center'>Noticias</h2>
        </Row>

        <Row>
            <NoticiasWeb/>
        </Row>
    </Container>
    )
}