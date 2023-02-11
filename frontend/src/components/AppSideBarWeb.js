import React from "react";
import '../assets/css/AppSideBarWeb.css'

import { CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarToggler,
    CNavTitle,
    CNavItem,
    CNavGroup
    } from '@coreui/react'
    import {useNavigate} from 'react-router-dom'

export default function AppSideBarWeb(props) {
    const navigate = useNavigate();
    

    return (
        <CSidebar className="sidebar-light" visible={props.mostrar} onVisibleChange= {(visible)=>{props.setMostrar(visible)}}>
            <CSidebarBrand>
                <img src="images/logo.png" width={100} alt="logo" className="logo" />
            </CSidebarBrand>
            <CSidebarNav>
                <CNavTitle>{props.opciones.titulo}</CNavTitle>
                {
                    props.opciones.items.map((item)=>{
                        
                        if(item.tipo === 'link'){
                            
                            return <CNavItem key={`${item.id}-nav`} href="#" 
                                    className={props.marcar === item.texto? 'sidebar-light-active':''}
                                    onClick={()=>{
                                        props.setMarcar(item.texto);
                                        props.setMostrar(false)
                                        navigate(`${item.link}`)
                                        }}>
                                    {item.texto}
                                </CNavItem>
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