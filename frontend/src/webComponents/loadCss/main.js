import {Obj_fetch} from '../peticiones_fetch/main.js'

export const loadCSS = (ruta_componente,nombre_archivo,vercion)=>{   
            
    var agregar= true
    document.querySelectorAll('Link').forEach((etiqueta)=>{        
       
        var arreglo = etiqueta.href.split('/')        
        agregar = arreglo[arreglo.length-1] == `${nombre_archivo}?v=${vercion}`? false:agregar
        
    })

    document.querySelector('head').innerHTML+= agregar?
    `<link rel="stylesheet" href="/UC3G/views/componentes/${ruta_componente}/css/${nombre_archivo}?v=${vercion}" type="text/css" media="all">`:''
    
}

export const loadVariablesCSS = async (pantalla,name,url)=>{
    
    //Carga las variables para los documentos css remplaza el documento existente        
    
    const data = new FormData()
    data.append('action','CreateVariablesCSS') 
    data.append('name',name)
    data.append('pantalla',pantalla)
   
    Obj_fetch.setURL(url)
    const respuesta = await Obj_fetch.getPost_Json(data)

    if(respuesta.ERROR == 'ERROR'){ 
        console.log(respuesta.comentario)
    }        
    
}