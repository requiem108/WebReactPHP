import { Obj_fetch } from '../peticiones_fetch/main.js';

const SelectUC3G = async () => {
  class SelectUC3G extends HTMLSelectElement {
    constructor() {
      super();
      this.url = '';
      this.modal = '';
      this.confirmacion = 'none';
      this.action = '';
      this.decode = 'none';
      this.mensajeConfirmacion = '¿Desea continuar?';
      this.valorAnterior = '';
      this.customData = [];
      this.functionPostSend = '';
      this.autoCloseModal = 0;
    }

    // Nombre de los atributos personalizados
    static get observedAttributes() {
      return ['confirmacion', 'url', 'action', 'decode'];
    }

    // Captura los valores de los atributos personalizados
    attributeChangedCallback(nameAtr, oldValue, newValue) {
      switch (nameAtr) {
        case 'confirmacion':
          this.confirmacion = newValue;
          break;

        case 'url':
          this.url = newValue;
          break;

        case 'action':
          this.action = newValue;
          break;

        case 'decode':
          this.decode = newValue;
          break;
      }
    }

    // Renderea el componente y su contenido
    async connectedCallback() {
      this.valorAnterior = this.value;
      this.onchange = this.sendSolicitud;
    }

    async sendSolicitud() {
      // Manda la solicitud REST a la URL de la propiedad o atributo
      try {
        Obj_fetch.setURL(this.url);
        let validacion = this.validation();
        if (!validacion.validacion) {
          throw validacion;
        }
        let value = this.decode === '' ? btoa(this.value) : this.value;
        let data = new FormData();
        data.append('action', this.action);
        data.append('value', value);
        this.customData.forEach((item) => {
          let value = this.decode === '' ? btoa(item.value) : item.value;
          data.append(item.name, value);
        });
        var attr_data = this.dataset;
        for (let name in attr_data) {
          if (name.substring(0, 4) === 'data') {
            data.append(name, attr_data[name]);
          }
        }
        const respuesta = await Obj_fetch.getPost_Json(data);
        let comentario = respuesta === null ? 'No se recibió respuesta' : respuesta.comentario;
        if (respuesta.ERROR === 'ERROR') {
          this.value = this.valorAnterior;
          throw { 'origen': respuesta.ERROR, 'comentario': respuesta.comentario };
        }
        // Si se agregó una función que se ejecute después de la solicitud
        if (this.functionPostSend !== '') {
          this.functionPostSend(this);
        }
        this.valorAnterior = this.value;
        return respuesta;
      } catch (error) {
        let key = error.origen === null ? 'error' : error.origen;
        switch (key) {
          case 'validacion':
            this.classList.add('inputfetch-ERROR');
            this.value = this.valorAnterior;
            console.log(error);
            break;
          case 'ERROR':
            this.classList.add('inputfetch-ERROR');
            this.value = this.valorAnterior;
            console.log(error);
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

        //Aqui van las validaciones        

        ok = comentario_val != ''? false: ok

        let res = {'validacion':ok,'comentario':comentario_val,'origen':'validacion'}

        return res


    }

    setValorAnterior(){
        this.valorAnterior = this.value
    }   

}	//CIERRE DE CLASE

window.customElements.define("select-uc3g",SelectUC3G,{extends:'select'}) 
}

//LLamada del componente
export const select_uc3g = SelectUC3G()