// WebLayout.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import AppBarHeadWeb from './AppBarHeadWeb';
import AppSideBarWeb from './AppSideBarWeb';
import AppFooterWeb from './AppFooterWeb';

export default function WebLayout({ children, mostrar, setMostrar, opciones, marcar, setMarcar }) {
  return (
    <div>
      <div className="App">
        <i className="fas fa-chevron-circle-down"></i>
        <AppBarHeadWeb setMostrar={setMostrar} opciones={opciones} marcar={marcar} setMarcar={setMarcar} />
      </div>
      <Container className='d-md-none'>
        <AppSideBarWeb mostrar={mostrar} setMostrar={setMostrar} opciones={opciones} marcar={marcar} setMarcar={setMarcar} />
      </Container>

      <Container fluid className='p-0 p-lg-2 main-container'> 
        {children}
      </Container>

      <Container className='' fluid>
        <AppFooterWeb />
      </Container>
    </div>
  );
}
