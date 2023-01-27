
import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import React  from 'react';

import LoginScreen from "./screens/LoginScreen";
import AdminScreen from "./screens/AdminScreen";
import HomeScreen from "./screens/HomeScreen";
import '@coreui/coreui/dist/css/coreui.min.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      
      </div> 
      <main>
        <Container fluid className='p-0'>
          <Routes>
            <Route path="/" element={<HomeScreen/>} />            
            <Route path="/login" element={<LoginScreen />} />   
            <Route path="/admin" element={<AdminScreen />} />                    
          </Routes>
        </Container>   
      </main>   
    </BrowserRouter>
    
  );
}

export default App;
