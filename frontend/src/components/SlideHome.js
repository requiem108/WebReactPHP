import React from "react";
import Carousel from 'react-bootstrap/Carousel';


function SlideHome() {
  return (
    <div>
      <Carousel className="slideHome" fade >
        <Carousel.Item >
          <img
            className="d-block w-100 img-slide"
            src="images/imgSlideHome/slide01.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="">
            <div>            
              <p>Soluciones de Agroinsumos<br/>para el desarrollo del campo</p>
              <h3>Mexicano.</h3>
            </div>        
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-slide"
            src="images/imgSlideHome/slide02.jpg"
            alt="Second slide"
          />

          <Carousel.Caption className="">
            <div> 
              <p>Lorem ipsum dolor sit amet,<br/> consectetur adipiscing elit.</p>
              <h3>Second slide label</h3>
            </div>          
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-slide"
            src="images/imgSlideHome/slide03.jpg"
            alt="Third slide"
          />

          <Carousel.Caption className="">   
            <div>
              <p>
                Praesent commodo cursus magna,<br/> vel scelerisque nisl consectetur.
              </p>
              <h3>Third slide label</h3>
            </div>        
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>   
    </div>
  );
}

export default SlideHome;