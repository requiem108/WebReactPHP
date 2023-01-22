 import React from 'react'

 import { Link,useNavigate } from 'react-router-dom';
 import { useEffect, useReducer } from "react";
 
 import Row from 'react-bootstrap/Row'
 import Col from 'react-bootstrap/Col'

 import { useSelector, useDispatch } from 'react-redux'
 import { useState } from 'react';

 import { Store} from '../Store';
 import { useContext } from 'react';


 import '../assets/css/AdminScreen.css';
 
 
 

 import { CHeaderToggler,CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler,CNavTitle,CNavItem,CNavGroup, CHeader } from '@coreui/react'
 //import AppSidebar from './components/AppSidebar.js';

 export default function AdminScreen(){

    const navigate = useNavigate();

    //Validamos token
    const {state, dispatch: ctxDispatch} = useContext(Store);
    useEffect(() => {    
        
        //Validate exist token in store
        if(state.token === ''){
            //navigate('/login');            
        }

    }, []);  
    
    //Crear estado para visualizar barra sidebarShow
    const {mostrar, setMostrar} = useState(true);
    const [count, setCount] = useState(true);

    

    return(
    <div>
         <div>
            <p>Count: {mostrar}</p>
            <button onClick={() => setCount(true)}>
                Increment
            </button>
            <button onClick={() => setCount(false)}>
                Decrement
            </button>
        </div>

        <CHeader position="sticky" className="">
            <CHeaderToggler
            className="ps-1"
            onClick={() => {
                //debugger
                //ctxDispatch({ type: 'SET_BAR', sidebarShow: !sidebarShow })
                
                }           
            }
            >
                <i className="fas fa-bars"></i>
            </CHeaderToggler>
            <div>
                <h3>Sistema de Administracion</h3>
            </div>
        </CHeader>      
           
                <CSidebar 
                    unfoldable={false}
                    visible={count}
                    onVisibleChange={(visible) => {
                        //debugger
                        //ctxDispatch({ type: 'SET_BAR', sidebarShow: visible })
                        setCount(visible)
                      }}
                    className="AdminScreen-bar min-vh-100">
                    <CSidebarBrand>Sidebar Brand</CSidebarBrand>
                   
                   
                </CSidebar> 
         </div>
    )
 }