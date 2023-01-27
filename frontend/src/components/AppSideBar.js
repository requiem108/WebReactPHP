import React from "react";

import { CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarToggler,
    CNavTitle,
    CNavItem,
    CNavGroup
    } from '@coreui/react'


export default function AppSideBar(props) {

    

    return (
        <CSidebar visible={props.mostrar} onVisibleChange= {(visible)=>{props.setMostrar(visible)}}>
            <CSidebarBrand>Nombre de la empresa</CSidebarBrand>
            <CSidebarNav>
                <CNavTitle>{props.opciones.titulo}</CNavTitle>
                {
                    props.opciones.items.map((item)=>{
                        
                        if(item.tipo === 'link'){
                            return <CNavItem key={`${item.id}-nav`} href="#" onClick={()=>props.activateOpcion()}>{item.texto}</CNavItem>
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
            <CSidebarToggler />
        </CSidebar>  
      );

    /*
  return (
    <CSidebar visible={props.mostrar} onVisibleChange= {(visible)=>{props.setMostrar(visible)}}>
        <CSidebarBrand>Nombre de la empresa</CSidebarBrand>
        <CSidebarNav>
            <CNavTitle>Pantallas</CNavTitle>
            <CNavItem href="#">     
            Noticias
            </CNavItem>
            <CNavItem href="#">      
            With badge      
            </CNavItem>
            <CNavGroup toggler="Productos">
            <CNavItem href="#">
                Nav dropdown item
            </CNavItem>
            <CNavItem href="#">
                Nav dropdown item
            </CNavItem>
            </CNavGroup>
        </CSidebarNav>
        <CSidebarToggler />
    </CSidebar>  
  );*/
}