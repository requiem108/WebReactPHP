import React from "react";

import { CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarToggler,
    CNavTitle,
    CNavItem,
    CNavGroup
    } from '@coreui/react'
import {useNavigate} from 'react-router-dom'

export default function AppSideBar(props) {
    const navigate = useNavigate();
    

    return (
        <CSidebar overlaid={true} visible={props.mostrar} onVisibleChange= {(visible)=>{props.setMostrar(visible)}}>
            <CSidebarBrand>Nombre de la empresa</CSidebarBrand>
            <CSidebarNav>
                <CNavTitle>{props.opciones.titulo}</CNavTitle>
                {
                    props.opciones.items.map((item)=>{
                        
                        if(item.tipo === 'link'){
                            return <CNavItem key={`${item.id}-nav`} href="#" 
                            onClick={()=>{
                                props.activateOpcion()
                                navigate(`${item.link}`)
                                }
                            }
                            >{item.texto}</CNavItem>
                        }
                        if(item.tipo === 'group'){
                            return(
                                <CNavGroup key={item.id} toggler={item.texto}>
                                    {                                        
                                        item.items.map((item2)=>{
                                            return <CNavItem key={`${item.id}-${item2.item}`} href="#">{item2.item}</CNavItem>
                                        })
                                    }                                
                                </CNavGroup>
                            )
                        }
                    })
                }
              
            </CSidebarNav>
            
        </CSidebar>  
      );

    
}