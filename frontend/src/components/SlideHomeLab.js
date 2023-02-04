import React from "react";
import Carousel from 'react-bootstrap/Carousel';


function SlideHomeLaboratorios() {
  return (
    <div className="col-12 w-100 slideHome-lab-contenedor">
      <Carousel indicators={false} className="slideHome-lab" fade >
        <Carousel.Item className="w-100">    
          <div className="d-flex justify-content-around align-items-center flex-wrap mt-4">      
            <img
              width={100}
              className="d-block img-slide"
              src="/images/imgSlideLaboratorios/Azufre.png"
              alt="First slide"
            />
            <img
              width={100}
              className="d-block img-slide"
              src="/images/imgSlideLaboratorios/Blue garden.png"
              alt="First slide"
            />
            <img
              width={100}
              className="d-block img-slide"
              src="/images/imgSlideLaboratorios/Casafum.png"
              alt="First slide"
            />
            <img
              width={100}
              className="d-block img-slide"
              src="/images/imgSlideLaboratorios/Cipermetrina.png"
              alt="First slide"
            />  
            <img
              width={100}
              className="d-block img-slide"
              src="/images/imgSlideLaboratorios/Azufre.png"
              alt="First slide"
            />
            <img
              width={100}
              className="d-block img-slide"
              src="/images/imgSlideLaboratorios/Blue garden.png"
              alt="First slide"
            />
            <img
              width={100}
              className="d-block img-slide"
              src="/images/imgSlideLaboratorios/Casafum.png"
              alt="First slide"
            />
            <img
              width={100}
              className="d-block img-slide"
              src="/images/imgSlideLaboratorios/Cipermetrina.png"
              alt="First slide"
            />
          </div>
                  
        </Carousel.Item>       
         
      </Carousel>   
    </div>
  );
}

export default SlideHomeLaboratorios;