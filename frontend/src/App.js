
import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import React  from 'react';

import LoginScreen from "./screens/LoginScreen";
import AdminScreen from "./screens/AdminScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      
      </div> 
      <main>
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />   
            <Route path="/admin" element={<AdminScreen />} />         
          </Routes>
        </Container>   
      </main>   
    </BrowserRouter>
    
  );
}

export default App;
