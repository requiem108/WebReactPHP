
//============================================================================================+
// componente name    : peticiones_fetch
// System             : 
// Description        : Permite realizar las peticiones tipo ajax
// Author             : Jose Isaias Morales
// Begin              : 20/09/2022
// Last Update        : 
//============================================================================================+

class ConsultarBD_fetch {

  constructor(){
    this.url = '';
  }

  setURL(url){
    this.url = url
  }

  //retorna json
  async getPost_Json(data){
      try {
          const consulta = await fetch(this.url,{
              method: 'POST',
              body: data });
          const respuesta = await consulta.json();
          return respuesta;
      }catch (e){
          const respuesta = null;
          return respuesta;
      }         
  }
//retorna text
  async  getPost_Text(data){
      const consulta = await fetch(this.url,{
          method: 'POST',
          body: data })
      const respuesta = await consulta.text();
      return respuesta;  
  }
//retorna Archivo
  async  getPost_Archivo(data,filename,extencion){
      const consulta = await fetch(this.url,{
          method: 'POST',
          body: data })
          .then(response => response.blob())
          .then(blob => URL.createObjectURL(blob))
          .then(uril => {
            debugger
              var link = document.createElement("a");
              link.href = uril;
              link.download = filename + extencion;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              });
        
  }

  //SERVICIO GET
  async getGet_Json(data,headers){
    
    try {
      const myRequest =new Request(this.url+data,{
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
      })
      const consulta = await fetch(myRequest);
      const respuesta = await consulta.json();
      return respuesta;
    }catch (e){
        const respuesta = null;
        return respuesta;
    }
  }    
}

export const Obj_fetch = new ConsultarBD_fetch()
