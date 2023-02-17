//============================================================================================+
// componente name    : Spin
// System             : 
// Description        : Muestra Spinner 
// Author             : Jose Isaias Morales
// Begin              : 20/09/2022
// Last Update        : 
//============================================================================================+

//import {loadCSS} from '../loadCss/main.js'

const SpinLoad = async ()=>{ 
	class Spin extends HTMLElement{
	
		
		//Nombre de los atributos personalizados
		static get observedAttributes(){
			return ['color']
		}

		//Captura los valores de los atributos personalizados
		attributeChangedCallback(nameAtr,oldValue,newValue){     
      
			switch (nameAtr) {
				case 'color':
					this.color = newValue
				break;			 
			}
		}
	  
		//Renderea el componente y su contenido
        connectedCallback(){            
            //loadCSS('genericos/Spin','spin.css','4')
            this.classList.add('UC3G_loading')      		

         
        } 
    /*------------------------------------------/
    /   Funciones extra para el componente
    /------------------------------------------*/
   

  }
	  
	  window.customElements.define("uc3g-spin",Spin)
}

//LLamada del componente
export const Spin = SpinLoad()

