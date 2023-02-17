export class TablaUC3G_FILTROS extends HTMLTableRowElement{

	constructor(){
		super();     
		this.data = []  
    this.inputs = []    
	}

	//Nombre de los atributos personalizados
	static get observedAttributes(){
			return []
	}

	//Captura los valores de los atributos personalizados
	attributeChangedCallback(nameAtr,oldValue,newValue){ 
		switch (nameAtr) {					
		}
	}

	//Renderea el componente y su contenido
	connectedCallback(){
		
		var titulos = ''
		var cont = 0
    if(this.data != null){
      this.data.forEach(element => {
        
        titulos += `<th style="width:${element.width};">`
        if(element.search != null){
          titulos += this.getTypeInput(element.search[0],cont,element)   
        }
        titulos += '</th>'
        
        cont++
      });		
    }

		this.innerHTML=titulos
    this.addEventsInputs(cont)
			
	}		

	setData(data){		
		this.data = data
  	this.connectedCallback() 
	}	

	filterEvent(event){
  	let element = event.target
		let tr = element.parentNode.parentNode.parentNode.parentNode
		let tabla_contenedor = tr.parentNode.parentNode.parentNode
			

		tabla_contenedor.consultarBD()		
	}

  getTypeInput(filtro,index, element){
    
    let value = element.value != null ? element.value : ''
    let name = element.name != null ? element.name : ''
    let orderable = element.orderable != null ? element.orderable : false
    let properties = filtro.properties != null? filtro.properties:''
    let type = filtro.type!= null? filtro.type:''
    let html = ``
    switch (filtro.tipo){
      case 'input':
        html += `<input 
        indice="${index}"
        type="${type}"
        name="${name}"
        value="${value}" 
        orderable=${orderable}      
        ${properties}
        />  
        `
      break;

      case 'select':
        html = `<select 
        indice="${index}"       
        name="${name}"
        orderable=${orderable} 
        ${properties}>  
        `
        filtro.options.forEach((option) => { 
          let Ovalue = option.value != null? option.value : ''
          let Oproperties = option.properties != null? option.properties:''
          let Otext = option.text != null? option.text:''
          let selected = option.value == value? 'selected' : ''

          html+=`<option value="${Ovalue}" ${Oproperties} ${selected}>
          ${Otext}
          </option>`
        })
        html+='</select>'
      break;      
    }

    return html
  }

  addEventsInputs(cont){ 
    //Agregamos los eventos a los filtros
    this.inputs = []
    for (let index = 0; index < cont; index++) {
      let input = this.children[index].children[0]      

      if(input != null) {
        this.inputs.push(input)
        
        switch (input.localName) {
          case 'input':
            input.onchange = this.filtrar      
          break;
        
          case 'select':
            input.onchange = this.filtrar
          break;
        }
      }
      
    }

  }

  filtrar(event){
    //debugger
    const input  = event.target
    const contenedor = input.parentNode.parentNode.parentNode.parentNode.parentNode
    contenedor.filtrar()
    //const tabla_padre = input.paren
    //console.log('filtrar')
  }
	

}//END CLASS