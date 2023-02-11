export class TablaUC3G_PAG extends HTMLElement {

    constructor() {
        super(); 
        this.boton_ant = ''
        this.botones_num = ''
        this.boton_sig = ''
        this.btns_visibles = 5
        this.total_registros = 1//se obtiene desde el back end
        this.filas_visibles = 1//se obtiene como propiedad de la tabla
        this.total_hojas = 0
        this.boton_selected = ''
        this.pagina_actual = 1
       
    }

    //Nombre de los atributos personalizados
    static get observedAttributes() {
        return ['total-registros','filas-visibles']
    }

    //Captura los valores de los atributos personalizados
    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch (nameAtr) {          
            case 'total-registros':
                this.total_registros = parseInt(newValue)
                break;
            case 'filas-visibles':
                this.filas_visibles = parseInt(newValue)
                break;
        }
    }

    //Renderea el componente y su contenido
    connectedCallback() {           
        
        this.total_hojas = Math.ceil(this.total_registros/this.filas_visibles)      

        this.innerHTML = `
        <a class="tabla-btopag-uc3g">Anterior</a>
        <span>${this.getBotonesNumericos(this.btns_visibles,this.total_hojas,this.pagina_actual)}</span>
        <a class="tabla-btopag-uc3g">Siguiente</a>
        `

        this.boton_ant = this.children[0]             
        this.botones_num = this.setEventsBtns()
        this.boton_sig = this.children[2]

        this.boton_ant.onclick = this.cambiarHoja 
        this.boton_sig.onclick = this.cambiarHoja

        

    }

    getBotonesNumericos(visibles,total_hojas,pagina_actual){
        let btns_html = ''
        let estructura = ''
        let boton_origen = `<a class="tabla-btopag-uc3g" >1</a><span>...</span>`
        let boton_final = `<span>...</span><a class="tabla-btopag-uc3g" >${total_hojas}</a>`
        let limite = 0
        //let pagina_actual = btn_selected != ''?parse_Int(btn_selected.innerHTML):1
        let num_temporal = 0 // es el numero con el que arranca en el for
        
        if(pagina_actual >= visibles && pagina_actual <= (total_hojas - visibles-1)){
            limite = 3
            estructura = 'A'//Se muestra el boton origen y final
            num_temporal = pagina_actual - 1
        }else if(pagina_actual < visibles){
            limite = visibles
            estructura = 'B'//Se muestra el boton final
            num_temporal = 1
        }else{
            limite = visibles
            estructura = 'C'//Se muestra el boton origen
            num_temporal = total_hojas - (visibles-1)
        }
      
        for (let index = 0; index < limite; index++) {
            let selected = (index+num_temporal) == pagina_actual? 'tablauc3g-btn-selected':''
            btns_html += `<a class="tabla-btopag-uc3g ${selected}">${(index+num_temporal)}</a>`            
        }

        switch (estructura) {
            case 'A':
                btns_html = boton_origen+btns_html+boton_final
            break

            case 'B':
                btns_html = btns_html+boton_final
            break
                
            case 'C':
                btns_html = boton_origen+btns_html
            break
            
        }

        return btns_html
    }

    setEventsBtns(){
        //Agregar evento a los botones
        let btns = []
        for(let btn of this.children[1].children){
            if(btn.classList.contains('tabla-btopag-uc3g')){
                btn.onclick = this.cambiarHoja
                btns.push(btn)
            }
        }

        return btns
    }

    async cambiarHoja(event){       
        //debugger 
        //Se apunta a la etiqueta padre
        let contenedor = ''
        if(event.target.innerHTML == 'Anterior'){
            contenedor = event.target.parentNode
            contenedor.pagina_actual = (contenedor.pagina_actual - 1) < 1? 1 : contenedor.pagina_actual -1
        }else if(event.target.innerHTML == 'Siguiente'){
            contenedor = event.target.parentNode
            contenedor.pagina_actual = (contenedor.pagina_actual + 1) >= contenedor.total_hojas? contenedor.total_hojas : contenedor.pagina_actual +1
        }else{
            contenedor = event.target.parentNode.parentNode
            contenedor.pagina_actual = parseInt(event.target.innerHTML)
        }

        contenedor.boton_selected = event.target        

        //Al consultarBD deve regresarme 
        await contenedor.connectedCallback()

        //descargar datos
        await contenedor.parentNode.filtrar()
    }



}//END CLASS