//============================================================================================+
// componente name    : Directorio componentes
// System             : 
// Description        : Permite realizar las peticiones tipo ajax
// Author             : Jose Isaias Morales
// Begin              : 20/09/2022
// Last Update        : 
// Uso(Pantalla)      : main
//============================================================================================+

import {Spin} from '../Spin/main.js'
import {Obj_fetch} from '../peticiones_fetch/main.js'



const InputUC3G = async ()=>{ 
    class InputUC3G extends HTMLInputElement{
    
        constructor(){      
            super()   
            this.url = ''
            this.modal = ''
            this.confirmacion = 'none' 
            this.action = '' 
            this.decode = 'none'
            this.mensajeConfirmacion = '¿Desea continuar?'
            this.valorAnterior= ''
            this.customData=[]

            this.functionPostSend = ''
            this.autoCloseModal=0
            this.functionError = ''
            
        }

        //Nombre de los atributos personalizados
        static get observedAttributes(){
            return ['confirmacion', 'url', 'action', 'decode']
        }

        //Captura los valores de los atributos personalizados
        attributeChangedCallback(nameAtr,oldValue,newValue){     
      
            switch (nameAtr) {
                case 'confirmacion':
                    this.confirmacion = newValue
                break;

                case 'url':
                    this.url = newValue
                break;

                case 'action':
                    this.action = newValue
                break;

                case 'decode':
                    this.decode = newValue
                break;
            }
        }
      
        //Renderea el componente y su contenido
        connectedCallback(){  
           
            

            this.onfocus = this.setValorAnterior
            this.onchange = this.sendSolicitud
            //this.onchange = this.sendSolicitud 
            
        }

        async sendSolicitud(){ 
            //Manda la solicitud Rest a la url de la propiedad o atributo
            try {    
                Obj_fetch.setURL(this.url)          

                let validacion = this.validation()

                if(!validacion.validacion){
                    throw validacion
                }

                let value = this.decode == ''? btoa(this.value) : this.value 
                let data = new FormData()
                data.append('action',this.action) 
                data.append('value',value) 
                
                this.customData.forEach((item)=>{
                    let value = this.decode == ''? btoa(item.value) : item.value 
                    data.append(item.name,value)
                })

                var attr_data = this.dataset
                for(let name in attr_data){
                    if(name.substring(0,4) == 'data'){
                        data.append(name,attr_data[name])
                    }                    
                }                

                const respuesta = await Obj_fetch.getPost_Json(data)              

                let comentario = respuesta == null ? 'No se recibió respuesta' : respuesta.comentario

                if(respuesta.ERROR == 'ERROR'){
                    throw {'origen': respuesta.ERROR, 'comentario':respuesta.comentario}
                }          
               

                //si se agrego una funcion que se ejecute post solicitud                
                if(this.functionPostSend != ''){
                    this.functionPostSend(this)
                }

                return respuesta
                
            } catch (error) {

                let key = error.origen == null ? 'error' : error.origen

                switch (key) {
                    case 'validacion':                       
                        
                        this.classList.add('inputfetch-ERROR')
                     
                        this.value = this.valorAnterior
                        console.log(error)
                    break; 
                    
                    case 'ERROR':
                        debugger
                        this.classList.add('inputfetch-ERROR')                        
                        this.value = this.valorAnterior
                        if(this.functionError != ''){
                            this.functionError()
                        }
                        console.log(error)
                    break;
                
                    default:
                        this.value = this.valorAnterior
                        console.log(error)
                    break;
                }
                
            }

            
            
            
        }

       

        validation(){
            
            let ok = true
            let comentario_val = ''

            //TEXT VALIDATION
            comentario_val = this.value == ''? 'No deven quedar valores en blanco' : comentario_val
            
            if(this.maxLength > 0){
                comentario_val = this.value.length > this.maxLength ? 'La cadena de texto es mas largo de lo permitido': comentario_val
            }

            //NUMBER VALIDATION
            if(this.max != '' && this.type == 'number'){
                comentario_val = parseFloat(this.value) > parseFloat(this.max) ? `El valor sobrepasa al maximo permitido:${this.max}`: comentario_val
            }

            if(this.min != '' && this.type == 'number'){
                comentario_val = parseFloat(this.value) < parseFloat(this.min) ? `El valor es inferior al minimo permitido:${this.min}`: comentario_val
            }

            ok = comentario_val != ''? false: ok

            let res = {'validacion':ok,'comentario':comentario_val,'origen':'validacion'}

            return res


        }

        setValorAnterior(){
            this.valorAnterior = this.value
        }   

  }	//CIERRE DE CLASE

  /*------------------------------------------/
  /   LOAD
  /------------------------------------------*/  
 
  window.customElements.define("input-uc3g",InputUC3G,{extends:'input'}) 
}

//LLamada del componente
export const input_uc3g = InputUC3G()

