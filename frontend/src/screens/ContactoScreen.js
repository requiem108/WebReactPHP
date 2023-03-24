import React from 'react'
import '../assets/css/ScreenContact.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { BsFillGeoAltFill,BsFillTelephoneFill,BsGlobe,BsStopwatch } from "react-icons/bs";

import ReCAPTCHA from "react-google-recaptcha";

export default function ContactoScreen({formvisible = true}){

    const recaptchaRef = (value)=>{
        console.log(value);
    }

   

    return(
        <div>
            <Container col={12} fluid>                
                <Row col={12}>
                    <Col sm={12}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3736.712881428984!2d-100.8545827969742!3d20.51799310041103!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x603db0f4dd5af2dc!2sMayoristas%20de%20Agroqu%C3%ADmicos%20y%20Semillas!5e0!3m2!1ses-419!2smx!4v1675535479568!5m2!1ses-419!2smx" 
                        width="100%" height="350" style={{border:0}} loading="lazy">                
                    </iframe>
                    </Col>
                </Row>
              
                    {formvisible? 
                      <Row className='d-flex justify-content-around p-md-4'>
                        <Col sm={12}>                    
                            <h2 className='text-center mt-2'>Contactános</h2>
                        </Col>
                        <Col sm={12} md={4} className="contacto-detalles ">
                            <div>
                                <div className=''>
                                    <p>Carretera Celaya-Salamanca Km2</p>
                                    <p>Las Fuentes Bajio de las Americas,</p>
                                    <p>38040 Celaya Gto.</p>
                                </div>
                                <BsFillGeoAltFill className=''/>
                            </div>
                            <div>
                                <div>
                                    <p>Teléfono: 461 614 40 60</p>
                                </div>
                                <BsFillTelephoneFill/>
                            </div>
                            <div>
                                <div>
                                    <a>https://miSitio.com</a>
                                </div>
                                <BsGlobe/>
                            </div>
                            <div>
                                <div>
                                    <p>9:00 am - 7:00pm</p>
                                </div>
                                <BsStopwatch/>
                            </div>
                        </Col>
                        <Col sm={12} md={6} className="m-2 d-flex flex-column align-items-center">
                            <Form className='contacto-formulario col-10'>                       
                                <Form.Group className="mb-3">                            
                                    <Form.Control name='nombre' type="input" placeholder="Nombre" />
                                </Form.Group>
                                <Form.Group className="mb-3">                            
                                    <Form.Control name='email' type="email" placeholder="Email" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control name='telefono' type="input" placeholder="Telefono" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control name='mensaje' as="textarea" rows={3} placeholder="Mensaje" />
                                </Form.Group>
                                <ReCAPTCHA
                                    sitekey="Your client site key"
                                    onChange={recaptchaRef}
                                    className=' recaptcha'
                                />
                                <Button className="btn-primary" type="submit">Contactar</Button>                        
                            </Form>                        
                        </Col>
                      </Row>
                        :''
                    }
                    
                
            </Container>
        </div>
    )
}