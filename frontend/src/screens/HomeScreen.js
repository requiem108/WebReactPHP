import React from "react";
import SlideHome from "../components/SlideHome";
import Container from 'react-bootstrap/Container';

import '../assets/css/ScreenHome.css';
import { BsChevronRight } from "react-icons/bs";

import { Link } from 'react-router-dom';
export default  function HomeScreen({setMarcar}) {
  
  
    return (
        <div>        
          
            <SlideHome/> 

            <Container col={10} className="homeA-container d-flex flex-wrap justify-content-center mt-3">
                <Container className="col-12 col-sm-4 d-flex justify-content-center p-2">
                    <div className="homeA-productE-circle"></div>
                    <img src="/images/Home/product-example.png" alt="prducto-ejemplo" className="homeA-productE"/>
                </Container>
                <Container className="col-12 col-sm-6 d-flex flex-column justify-content-center">
                    <h2>¡Tenemos los Mejores</h2>
                    <h2>Productos para tus Cultivos!</h2>
                    <hr></hr>
                    <p>Contactanos nosotros te ayudamos</p>
                    <Link to="/Productos" onClick={() => setMarcar('Productos')} className="btn btn-primary">Productos
                        <div><BsChevronRight/></div>
                    </Link>
                </Container>
            </Container>
            
          
        </div>
    );
}