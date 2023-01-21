 import React from 'react'

 import { Link,useNavigate } from 'react-router-dom';
 import { useEffect, useReducer } from "react";

 import { Store } from '../Store';
 import { useContext } from 'react';

 

 import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler,CNavTitle,CNavItem,CNavGroup } from '@coreui/react'

 export default function AdminScreen(){

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
   

    useEffect(() => {    
        
        //Validate exist token in store
        if(state.token === ''){
            //navigate('/login');            
        }

    }, []);   

    

    return(
        <div> 
            <CSidebar>
  <CSidebarBrand>Sidebar Brand</CSidebarBrand>
  <CSidebarNav>
    <CNavTitle>Nav Title</CNavTitle>
    <CNavItem href="#">     
      Nav item
    </CNavItem>
    <CNavItem href="#">      
      With badge      
    </CNavItem>
    <CNavGroup toggler="Nav dropdown">
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
            <div>
                <h1>Admin</h1>
            </div>
        </div>
        
    )
 }