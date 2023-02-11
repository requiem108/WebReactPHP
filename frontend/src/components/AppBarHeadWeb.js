import React from 'react'
import '../assets/css/AppBarHeadWeb.css'
import { 
    CNavItem,   
    CHeader,
    CContainer,
    CHeaderToggler,    
    CHeaderNav
    } from '@coreui/react'
import { Link } from 'react-router-dom';
import { BsList } from "react-icons/bs";

export default function AppBarHeadWeb({setMostrar,opciones,marcar,setMarcar}) {
   
    
    return (
        <CHeader className="mb-0 header-nav ">
                <CContainer fluid>
                    <CHeaderToggler
                    className="ps-1 d-xs-block  d-md-none"
                    onClick={() => setMostrar(true)}
                    >
                       <BsList/>
                    </CHeaderToggler>
                    <CContainer className="col-12 d-none d-md-flex d-flex justify-content-between m-0">
                    
                        <CHeaderNav className="col-3 d-md-flex">
                            <CNavItem>
                                <img src="images/logo.png" width={200} alt="logo" className="logo" />
                            </CNavItem>
                        </CHeaderNav>
                            
                        <div className="col-7 d-md-flex justify-content-center">
                        {
                            opciones.items.map((opcion) => (
                                <CHeaderNav key={opcion.id} className="d-md-flex align-items-center me-auto">
                                    <CNavItem>
                                        <Link to={opcion.link} 
                                            onClick={() => setMarcar(opcion.texto)}
                                            className={marcar === opcion.texto? 'header-nav-a-selected':''}>
                                                {opcion.texto}
                                        </Link> 
                                    </CNavItem>
                                </CHeaderNav>
                            ))
                        }   
                        </div> 
                    </CContainer>    
                    
                </CContainer>
            </CHeader>
    )
}