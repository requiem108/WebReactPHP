import React from 'react'
import { 
    CNavItem,   
    CHeader,
    CContainer,
    CHeaderToggler,    
    CHeaderNav
    } from '@coreui/react'


export default function AppBarHead(props) {
    
    return (
        <CHeader position="sticky" className="mb-4">
                <CContainer fluid>
                    <CHeaderToggler
                    className="ps-1 d-xs-block  d-md-none"
                    onClick={() => props.setMostrar(true)}
                    >
                        <i className="fas fa-bars"></i>
                    </CHeaderToggler>
                
                    <CHeaderNav>
                        <CNavItem>
                            Sistema de Administracion
                        </CNavItem>
                    </CHeaderNav>
                </CContainer>
            </CHeader>
    )
}