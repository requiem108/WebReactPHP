//============================================================================================+
// componente name    : Tabla
// System             : 
// Description        : Crea un version desde el fron de la tabla usada en jquery
// Author             : Jose Isaias Morales
// Begin              : 24/10/20222
// Last Update        : 
// Uso(Pantalla)      : main
//============================================================================================+

import {loadCSS} from '../loadCss/main.js'
import {Obj_fetch} from '../peticiones_fetch/main.js'
import '../Spin/main.js'
import { TablaUC3G_TH } from "./tablauc3g_titulos.js"
import { TablaUC3G_FILTROS } from "./tablauc3g_filtros.js"
import { TablaUC3G_INFO } from "./tablauc3g_info.js"
import { TablaUC3G_PAG } from "./tablauc3g_pag.js"

const TablaUC3G = async ()=>{ 
  class TablaUC3G extends HTMLElement{
    
		constructor(){      
			super()	
			//this.attachShadow({mode: 'open'})//Para que los elementos no colicionen
			this.HEAD = ''
            this.TITULOS = ''
			this.FILTROS = ''
			this.campos = ''	
			this.filas_x_hoja = 10	
			this.total_registros = 0
			this.data_personalizada = []
			this.url = ''
			this.searchDefecto=''
			this.showRowsMovil = 1

			this.functionSuccess = ''
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
		connectedCallbackt(){
			this.innerHTML = `<h1>Hello TABLA!</h1>`
		}
		connectedCallback(){
			
			this.innerHTML =  `	
			<div class="tabla-uc3g-boton-search">Buscar <div deg="0" class="tablauc3g-search-down"></div></div>		
			<table class ="display dataTable no-footer dtr-inline">
				<thead>
					<tr is="tabla-titulo-uc3g"></tr>
					<tr is="tabla-filtros-uc3g"></tr>
					
				</thead>
				<tbody>
					
				</tbody>
			</table>
			<tabla-info-uc3g filasxhoja="${this.filas_x_hoja}"></tabla-info-uc3g>
			<tabla-pag-uc3g total-registros="${this.total_registros}" filas-visibles="${this.filas_x_hoja}"></tabla-pag-uc3g>
			
			` 
			//debugger
			this.BTN_SEARCH = this.children[0]
			this.HEAD = this.children[1].children[0]
			this.TITULOS = this.children[1].children[0].children[0]
			this.FILTROS = this.children[1].children[0].children[1]
			this.BODY = this.children[1].children[1]
			this.INFO = this.children[2]
			this.PAG = this.children[3]
			this.afterRender()	
			
			this.BTN_SEARCH.onclick = this.showHeader
		}
 
		async afterRender(){ 			
		}	
		
		/**PARA MOVIL */
		showHeader(event){
			//debugger
			var contenedor = event.target.parentNode
			var flecha = event.target.children[0]
			if(contenedor.HEAD == null){
				contenedor = event.target.parentNode.parentNode
				flecha = event.target
			}
			contenedor.HEAD.classList.toggle('showHeader')
			flecha.attributes.deg.value= parseInt(flecha.attributes.deg.value)+180
			flecha.style.transform = `rotate(${flecha.attributes.deg.value}deg)`
			//flecha.style.transform = 'rotate()'
		}

		/**PARA MOVIL */
		showRow(event){
			//debugger
			//el click fue sobre el boton
			let flecha = event.target
			let tr = ''
			let filacount = 0		
			if(flecha.attributes.deg == null){
				//el click fue sobre la flecha
				filacount = event.target.attributes.filacount.value-1
				flecha = event.target.children[0]
			}else{
				tr = event.target.parentNode	
				filacount = tr.attributes.filacount.value-1
			}
			//let tabla = event.target.parentNode.parentNode

			//tabla.rows[filacount].classList.toggle('tabla-uc3g-trshow')
			flecha.parentNode.parentNode.children[filacount].classList.toggle('tabla-uc3g-trshow')
			flecha.attributes.deg.value= parseInt(flecha.attributes.deg.value)+180
			flecha.style.transform = `rotate(${flecha.attributes.deg.value}deg)`

		}

        setEstructuraJson(campos,filtrar){					
            this.campos = campos 
			this.TITULOS.setData(campos)   
			this.FILTROS.setData(campos)
			//debugger
			if(filtrar){
				this.filtrar()
			}
					   
        }

		setSearchDefecto(value){
			this.searchDefecto = value
		}

		async filtrar(){
			//debugger	
			this.BODY.innerHTML = `<tr><td colspan="${this.campos.length}" style="min-height:60px"><uc3g-spin></uc3g-spin></div></tr>`							
			const respuesta = await this.descargarFilasBD()
			this.INFO.hoja = (this.PAG.pagina_actual*this.filas_x_hoja)-this.filas_x_hoja
			this.INFO.totalmostrado = respuesta != null? respuesta.iTotalDisplayRecords : '0'
			this.INFO.total = respuesta != null? respuesta.iTotalRecords : '0'
			this.INFO.connectedCallback()

			this.PAG.total_registros = respuesta != null? respuesta.iTotalDisplayRecords: '1'
			this.PAG.connectedCallback()

			respuesta != null? this.renderBody(respuesta.aaData) : this.BODY.innerHTML = `<tr><td colspan="${this.campos.length}"></td></tr>`

			if(this.functionSuccess !== ''){
				this.functionSuccess()
			}
		}
		
		async descargarFilasBD(){			
			console.log("Consultar")
			//Agregamos url al objeto fetch
			Obj_fetch.url = this.url
			var data = '?'

			//Cargamos los datos personalizados
			this.data_personalizada.forEach((item)=>{
				//data.append(`${item.name}`,`${item.value}`)
				data += data === '?' ?'':'&'
				data+=`${item.name}=${item.value}`
			})

			//Columnas
			let contador = 0
			this.FILTROS.inputs.forEach((item)=>{
				data += `&columns[${contador}][data]=${contador}
				&columns[${contador}][name]=${item.name}
				&columns[${contador}][searchable]=true
				&columns[${contador}][orderable]=${item.attributes.orderable.value}
				&columns[${contador}][search][value]=${item.value}
				&columns[${contador}][search][regex]=false				
				`
				contador++
			})

			//Cuando se requiere que ordene en relacion a una columna por defecto
			this.TITULOS.bOrders.forEach((item) =>{
				data +=`&order[0][column]=${item.column}
				&order[0][dir]=${item.dir}`
			})

			//complememnto
			data += `&start=${(this.PAG.pagina_actual*this.filas_x_hoja)-this.filas_x_hoja}
			&length=${this.filas_x_hoja}
			`

			//Cuando se requiere que filtre un valor por defecto
			data+= `&search[value]=${this.searchDefecto}
			&seach[regex]=false
			`			

			//Mandar peticion
			const respuesta = await Obj_fetch.getGet_Json(data)

			return respuesta
		}

		async renderBody(aaData){
			//debugger
			let html = ''	
			let filacount=1					
			aaData.forEach((fila)=>{
				html += `<tr data-max-height="47">`
				let cont = 0

				fila.forEach((column)=>{					
					html += `<td data-label="${this.TITULOS.data[cont].titulo}">${column}</td>`
					cont++
				})

				//si excede la cantidad columnas a mostrar aparecera el boton ver mas
				if(fila.length>= this.showRowsMovil){
					html += `<div filacount="${filacount++}" class="tabla-uc3g-fila-btn-mas">Ver <div deg="0"></div></div>
					</tr>`
				}else{
					html += `</tr>`
				}
				
				filacount++
			})

			this.BODY.innerHTML = html

			//Agregar Eventos
			let lista = document.querySelectorAll(`.tabla-uc3g-fila-btn-mas`)
			lista.forEach((row)=>{
				row.onclick = this.showRow
			})
		}
		

}	//CIERRE DE CLASE



await loadCSS('genericos/tabla','tabla.css','0.10')
//await Spin() 

window.customElements.define("tabla-titulo-uc3g",TablaUC3G_TH,{extends: "tr"}) 
window.customElements.define("tabla-filtros-uc3g",TablaUC3G_FILTROS,{extends: "tr"}) 
window.customElements.define("tabla-info-uc3g",TablaUC3G_INFO) 
window.customElements.define("tabla-pag-uc3g",TablaUC3G_PAG)
window.customElements.define("tabla-uc3g",TablaUC3G) 

}

//LLamada del componente
export const tabla = TablaUC3G()


