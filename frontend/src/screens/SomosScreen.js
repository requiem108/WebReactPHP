import React from 'react';
import '../assets/css/SomosScreen.css'
import { Container, Row, Col } from 'react-bootstrap';

export default function SomosScreen() {
    return (
        <Container fluid>
          <Row className="d-flex justify-content-center">
            <Col xs={12} md={5}>
              <img className="img-fluid somos-img" src="/images/Home/senior.png" alt="Senior" />
            </Col>
            <Col xs={12} md={5} className="somos-text-container">
              <h2 className=" col-xs-10 col-md-10 underlined text-center">¡Creciendo Juntos!</h2>
              <p className="col-xs-10 col-md-10 text-justify">Mas Agroquímicos y Semillas S.A. de C.V.
               es una empresa enfocada a contribuir con el desarrollo del campo
                mexicano, ofreciendo soluciones y agroinsumos en un entorno ecológicamente 
                responsable, con el talento y compromiso de sus colaboradores.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="homeB-container p-0 mb-2 somos-nhistoria">
              <h3 className="text-center">Nuestra historia</h3>
              <div className="d-flex justify-content-center flex-wrap somos-textob">
                <div className="half-container p-2 p-md-4">
                  <p className="text-justify">
                  Fundada en la ciudad de Celaya, Guanajuato, 
                  como una división comercial de Agroquímicos Rivas S.A de C.V.,
                   con el fin de atender al canal de sub-distribuidores en la
                    región Bajío.
                  <br/>
                  <br/>
                  <span className='fs-4'>Política de Calidad</span>
                  “Ofrecer a nuestros subdistribuidores, empresas agrícolas y 
                  público en general, los productos para el mejor rendimiento
                   de sus cultivos y control de plagas agrícolas y urbanas, 
                   cumpliendo los requerimientos de partes interesadas y 
                   con un firme compromiso de mejora continua en nuestros 
                   procesos.»
                  </p>
                </div>
                <div className="half-container p-2 p-md-4">
                  <p className="text-justify">
                    <span className='fs-4'>Alcance del SGC</span>
                    «Comercialización de: productos insecticidas, fertilizantes,
                     fungicidas, coadyuvantes, rodenticidas, herbicidas,
                      reguladores de crecimiento, inoculantes, semillas, equipos
                       de aplicación y de protección personal para el control de 
                       plagas en empresas agrícolas, urbanas y alimentarias, 
                       cumpliendo con los requerimientos de la norma 
                       ISO 9001:2015 y de las partes interesadas de MAS 
                       Agroquímicos y Semillas S.A de C.V. ubicada en carretera 
                       Celaya-Salamanca Km 2 y sucursales localizadas en: Salamanca
                        – Querétaro Corregidora – Querétaro Carrillo – 
                        Dolores Hidalgo – Santa Ana Pacueco Lagos de Moreno – 
                        Aguascalientes – San Luis Potosí ».
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
}