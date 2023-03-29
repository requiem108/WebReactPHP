import React, {useEffect} from "react";

import { CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarToggler,
    CNavTitle,
    CNavItem,
    CNavGroup
    } from '@coreui/react'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function AppSideBar(props) {
    const navigate = useNavigate();

  
    

    return (
        <CSidebar overlaid={true} visible={props.mostrar} onVisibleChange= {(visible)=>{props.setMostrar(visible)}}>
            <CSidebarBrand>Admin MAS MAS</CSidebarBrand>
            <CSidebarNav>
                <CNavTitle>{props.opciones.titulo}</CNavTitle>
                {
                    props.opciones.items.map((item)=>{
                        
                        if(item.tipo === 'link'){
                            return <div key={`${item.id}-nav`}
                            className={`nav-item ${props.marcar === item.texto ? 'sidebar-light-active' : ''} m-2 mt-3`}
                            onClick={() => {                                
                                
                                props.activateOpcion()
                            }}>
                            <Link className="p-2" to={item.link} style={{textDecoration: 'none',color: 'inherit',} }>
                                {item.texto}
                            </Link>
                        </div>
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