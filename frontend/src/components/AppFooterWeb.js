import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import '../assets/css/AppFooterWeb.css';

import { BsFillGeoAltFill,
    BsFillTelephoneFill,
    BsFillEnvelopeFill,
    BsFillGearFill
} from "react-icons/bs";


export default function AppFooterWeb(){
    return(
        <div>
            <Container fluid className="footer-web p-0">
                <Row className="footer-web-fl d-flex justify-content-around flex-wrap">
                    <Col sm={6} md={4}  className="d-flex justify-content-center align-items-start footer-web-fl-block">
                        <BsFillTelephoneFill/>
                        <div>
                            <h2>LLÁMANOS</h2>
                            <p>461 614 40 60</p>
                        </div>                        
                    </Col>
                    <Col sm={6} md={4} className="d-flex justify-content-center align-items-start footer-web-fl-block">
                        <BsFillGeoAltFill />
                        <div>
                            <h2>VISÍTANOS</h2>
                            <p>Carretera Celaya-Salamanca Km2</p>
                            <p>Las Fuentes Bajio de las Americas,</p>
                            <p>38040 Celaya Gto.</p>
                        </div>                        
                    </Col>
                    <Col sm={6} md={4} className="d-flex justify-content-center align-items-start footer-web-fl-block">
                        <BsFillEnvelopeFill/>
                        <div>
                            <h2>MÁNDANOS<br></br>UN CORREO</h2>
                            <p>correo@miempresa.com</p>
                        </div>
                    </Col>
                </Row>
                <Row className="position-relative footer-web-sl d-flex justify-content-around flex-wrap align-items-center">
                    <Col xs={12} md={3} className="d-flex justify-content-center mt-3" >
                        <h1>LOGO</h1>
                        <Link to="/admin">
                            <BsFillGearFill className="position-absolute bottom-0 start-0 m-2"/>
                        </Link> 
                    </Col>
                    <Col xs={3}>
                        <h2>Nosotros</h2>
                        <p>Mision</p>
                        <p>Vision</p>
                        <p>Valores</p>
                    </Col>
                    <Col xs={3}>
                        <h2>Productos</h2>
                        <p>texto a</p>
                        <p>texto b</p>                        
                    </Col>
                    <Col xs={3}>
                        <h2>Suscribete</h2>
                        <p>texto a</p>
                        <p>texto b</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}