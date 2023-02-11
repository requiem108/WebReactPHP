import React from 'react'
import { 
    CNavItem,   
    CHeader,
    CContainer,
    CHeaderToggler,    
    CHeaderNav
    } from '@coreui/react'
    import { BsList } from "react-icons/bs";

export default function AppBarHead(props) {
    
    return (
        <CHeader position="sticky" className="mb-0">
                <CContainer fluid>
                    <CHeaderToggler
                    className="ps-1 d-xs-block  d-md-none"
                    onClick={() => props.setMostrar(true)}
                    >
                    <BsList/>
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