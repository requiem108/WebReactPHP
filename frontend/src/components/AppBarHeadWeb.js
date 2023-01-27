import React from 'react'
import { 
    CNavItem,   
    CHeader,
    CContainer,
    CHeaderToggler,    
    CHeaderNav
    } from '@coreui/react'


export default function AppBarHeadWeb({setMostrar,opciones}) {
    
    return (
        <CHeader className="mb-0">
                <CContainer fluid>
                    <CHeaderToggler
                    className="ps-1 d-xs-block  d-md-none"
                    onClick={() => setMostrar(true)}
                    >
                        <i className="fas fa-bars"></i>
                    </CHeaderToggler>
                    <CContainer className="col-12 d-none d-md-flex d-flex justify-content-between m-0">
                    
                        <CHeaderNav className="col-3 d-md-flex">
                            <CNavItem>
                                <img src="images/logo.png" width={200} alt="logo" className="logo" />
                            </CNavItem>
                        </CHeaderNav>
                            
                        <div className="col-6 d-md-flex justify-content-center">
                        {
                            opciones.items.map((opcion) => (
                                <CHeaderNav key={opcion.id} className="d-md-flex align-items-center me-auto">
                                    <CNavItem>
                                        {opcion.texto}
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