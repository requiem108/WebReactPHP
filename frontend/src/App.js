import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes, Route,Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import React  from 'react';

import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      
      </div> 
      <main>
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />            
          </Routes>
        </Container>   
      </main>   
    </BrowserRouter>
    
  );
}

export default App;
