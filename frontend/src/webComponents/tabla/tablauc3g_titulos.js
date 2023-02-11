export class TablaUC3G_TH extends HTMLTableRowElement{

	constructor(){
		super();     
		this.data = []	
		this.rowsUP = []
		this.rowsDOWN = []
		this.bOrders=[]
		this.titulos=[]
   
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
					titulos += `<th scope="col"> 
					<div>
						<p>${element.titulo}</p>
						<div>${this.getRow(element,cont)}</div>
					</div>
					</th>
					`				
					cont++
			});	
		}
		this.innerHTML=titulos
		this.setALLrows()		
	}	

	getRow(element,cont){
		
		let html = ``
		let bOrder = element.bOrder != null ? element.bOrder : ''
		let classOrder_asc = ''
		let classOrder_desc = ''
		if(bOrder == 'asc'){
			classOrder_asc = 'titulouc3g_active_up'
		}else if(bOrder == 'desc'){
			classOrder_desc = 'titulouc3g_active_down'
		}
		
		if(element.orderable){
			html = `<div index="${cont}" dir="asc" class="tablauc3g-order-up ${classOrder_asc}"></div>
			<div index="${cont}" dir="desc" class="tablauc3g-order-down ${classOrder_desc}"></div>`
		}

		if(bOrder != ''){
			this.bOrders.push({column:cont,dir:bOrder})
		}
		

		return html
	}

	setData(data){				
		this.data = data== null ? [] : data
  		this.connectedCallback() 
	}

	setALLrows(){
		let direccion = 'up'
		this.rowsUP = []
		this.rowsDOWN = []

		for(let th of this.children){
			if(th.children[0].children[1].children.length > 0){
				for(let row of th.children[0].children[1].children){
					//se agregan las flechas al arreglo respectivo y se agrega el evento
					if(direccion == 'up'){
						this.rowsUP.push(row)						
						direccion = 'down'
					}else{
						this.rowsDOWN.push(row)
						direccion = 'up'
					}
					row.onclick = this.orderEvent					
				}
			}
		}		

	}

	orderEvent(event){
		//debugger
  		let element = event.target
		let tr = element.parentNode.parentNode.parentNode.parentNode
		let tabla_contenedor = tr.parentNode.parentNode.parentNode
		
		
		//Quitar clase active a todas las flechas
		tr.rowsUP.concat(tr.rowsDOWN).forEach(item=>{item.classList.remove('titulouc3g_active_up','titulouc3g_active_down')})
		
		element.attributes.dir.value == 'asc'?element.classList.add('titulouc3g_active_up'):
		element.classList.add('titulouc3g_active_down')

		tr.bOrders = [{column: `${element.attributes.index.value}`, dir:`${element.attributes.dir.value}`}]

		tabla_contenedor.filtrar()		
	}
	

}//END CLASS






