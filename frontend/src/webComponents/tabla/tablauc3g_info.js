export class TablaUC3G_INFO extends HTMLElement{

	constructor(){
		super();     
		 this.filasxhoja = 0
     this.hoja = 0
     this.total = 0
	}

	//Nombre de los atributos personalizados
	static get observedAttributes(){
			return ['filasxhoja','hoja','total','totalmostrado']
	}

	//Captura los valores de los atributos personalizados
	attributeChangedCallback(nameAtr,oldValue,newValue){ 
		switch (nameAtr) {	
      case 'filasxhoja':
        this.filasxhoja = newValue;
      break;	
      
      case 'hoja':
        this.hoja = newValue;
      break;
      
      case 'total':
        this.total = newValue;
      break;

      case 'totalmostrado':
        this.totalmostrado = newValue;
      break;

      default:
      
		}
	}

	//Renderea el componente y su contenido
	connectedCallback(){

    //this.classList.add('dataTables_paginate', 'paging_simple_numbers')
		this.innerHTML=`Mostrando registros del ${this.hoja} al ${this.filasxhoja} 
    de un total de ${this.totalmostrado} de registros 
    (filtrado de un total de ${this.total} registros)`   
			
	}		

 

}//END CLASS