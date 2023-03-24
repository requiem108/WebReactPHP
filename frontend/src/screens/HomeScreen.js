import React from "react";
import SlideHome from "../components/SlideHome";
import SlideHomeLaboratorios from "../components/SlideHomeLab";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../assets/css/ScreenHome.css';

import { BsChevronRight,BsFillBugFill } from "react-icons/bs";

import { Link } from 'react-router-dom';

import ContactoScreen from './ContactoScreen.js';
import SlideLaboratorios from '../components/SlideLaboratorios';


export default  function HomeScreen({setMarcar}) {
  
  
    return (
        <div>        
          
            <SlideHome/> 

            <Container className="homeA-container d-flex flex-wrap justify-content-center">
                <Container className="col-12 col-sm-4 d-flex justify-content-center p-2">
                    <div className="homeA-productE-circle"></div>
                    <img src="images/Home/product-example.png" alt="prducto-ejemplo" className="homeA-productE"/>
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

            <Container className="homeB-container p-0 mb-5" fluid>
                <h2>Laboratorios</h2>
                <SlideLaboratorios/>
            </Container>              
            
            <Container className="p-0 mb-5" fluid>
                <h2 className='text-center mt-2'>Contactános</h2>
                <ContactoScreen formvisible={false}/>   
            </Container>
                    

          
        </div>
    );
}