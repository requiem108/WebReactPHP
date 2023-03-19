import React from 'react'
import { 
    CNavItem,   
    CHeader,
    CContainer,
    CHeaderToggler,    
    CHeaderNav
    } from '@coreui/react'
import Button from 'react-bootstrap/Button';
import { BsList } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function AppBarHead(props) {

    
    
    return (
        <CHeader position="sticky" className="mb-0">
                <CContainer fluid>
                    <CHeaderToggler
                    className="ps-1 d-xs-block "
                    onClick={() => props.setMostrar(true)}
                    >
                    <BsList/>
                    </CHeaderToggler>
                
                    <CHeaderNav>
                        <CNavItem>
                            <Link to="/admin/">
                                Sistema de Administracion
                            </Link>  
                            <Button onClick={props.Salir} className="btn btn-danger m-1">
                                Salir
                            </Button>                        
                        </CNavItem>
                    </CHeaderNav>
                </CContainer>
            </CHeader>
    )
}