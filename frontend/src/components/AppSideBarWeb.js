import React, { useEffect } from "react";
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
    import { Link } from 'react-router-dom';

export default function AppSideBarWeb(props) {
    const navigate = useNavigate();
      
    useEffect(() => {        
    
        handleVisibleChange(props.mostrar);
    }, [props.mostrar, props.setMostrar]);

    function handleVisibleChange(visible) {
        props.setMostrar(visible);
    }
    
//debugger
    return (
        <CSidebar className="sidebar-light"
          visible={props.mostrar} 
          onVisibleChange={(visible) => handleVisibleChange(visible)}>
            <CSidebarBrand>
                <img src="images/Home/MAS_COLOR.png" width={100} alt="logo" className="logo" />
            </CSidebarBrand>
            <CSidebarNav>
                <CNavTitle>{props.opciones.titulo}</CNavTitle>
                {
                    props.opciones.items.map((item)=>{
                        
                        if(item.tipo === 'link'){
                            
                            return <div key={`${item.id}-nav`}
                            className={`nav-item ${props.marcar === item.texto ? 'sidebar-light-active' : ''} m-2 mt-3`}
                            onClick={() => {
                                props.setMarcar(item.texto);
                                props.setMostrar(false)
                            }}>
                            <Link className="p-2" to={item.link}>
                                {item.texto.toUpperCase()}
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