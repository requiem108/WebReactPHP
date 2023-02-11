<?php

#-------------------------------------------------
#    SEGURIDAD POR SESSION
#-------------------------------------------------
isset($_GET['test'])? session_start():'';


//Por seguridad si no existe la session solo imprime error
if(!isset($_SESSION['CS_SESION_IDs']) and $_SESSION['CS_SESION_ID']==''){
  $pantalla = null;
  echo'ERROR';
  return;
}


//DIRECCION DE LA CLASE PADRE
$url_class_padre = isset($_GET['test'])?'../../../../helpers/php/test_components.php': '../../helpers/php/test_components.php';
require_once $url_class_padre;


class TEST extends _TEST_COMPONENTES_  {  
 
  public function defineView(){ 

    //Cargar styles
    //$this->loadStyles($oDb);

    $UsuarioTag = $_SESSION['CS_USUARIO_PERFIL_TAG_'.$_SESSION['CS_SESION_ID']];  
    $facultad = 'Facultad de Talento Humano 2';
    $claseFacultad = 'COM';
    $this->pagina = '    
      <div class="w3-container" id="SuperContainer"> 
      
        <div class="w3-row w3-border w3-card-4">          
          <div class="w3-container uc3gMainDivUpAdmin">
            <div id="uc3gMainDiv" style=""> 
            <div class="w3-container">
            <div class="w3-row w3-border w3-card-4">
            
            <br><br><br>
            <tabla-uc3g class="w3-animate-zoom" id="tabla-uc3g-2"></tabla-uc3g> 
                   
            <br><br>
            <tabla-uc3g id="tabla-uc3g-1"></tabla-uc3g>                

            </div>
          </div>
        </div>
      </div>      
    ';      
  }

}//Fin de la clase


#-------------------------------------------------
#    DEFINE VALORES
#-------------------------------------------------
//return;
//Define la carpeta y la pantalla del componente a probar
$nombre = 'tabla';
$componentes[]=array('nombre'=>$nombre,'pantalla'=>'genericos');
$pantalla = new TEST($componentes);


$pantalla->setNombre($nombre);
$descripcion='Sistema frontend para el uso de tablas, mejorando la apariencia,<br>
responsiva del contenido';
$pantalla->setDescripcion($descripcion);


if(isset($_GET['test'])){
  //Visualiza el componente desde el link 
  echo $pantalla->getContenido()['pagina'].$pantalla->JS_componente;
  echo '
  <script defer> 

  const myTimeout = setTimeout(test, 500);
  const myTimeout2 = setTimeout(getAlumnosGeneracion, 500);
  function test(){
    var tablaDetail1 = [
        {
            titulo:`Modulo de Capacitacion`,
            name:`ModuloName`,
            orderable:true,
            bOrder:`asc`,
            search:[{tipo:`input`,value:``,type:`text`,propierties:``}],
            width:`100px` 
           
        },
        {
            titulo:`Estado`,
            name:`EstadoName`,
            orderable:true,
            value:`A`,
            search:[{tipo:`select`,value:``,propierties:``,
              options:[
                {value:``,propierties:``,text:`Estado`},
                {value:`A`,propierties:``,text:`Activo`},                
                {value:`I`,propierties:``,text:`Inactivo`}
                ]
            }],
            width:`100px`
        }
    
      ]
    
      var tabla1 = document.querySelector(`#tabla-uc3g-1`)
      tabla1.data_personalizada = [
        {name:`action`,value:`listMCmo6`},
        {name:`clase`,value:`bW82`}
      ]
      tabla1.url = `http://10.10.10.74/UC3G/views/tbl/mo6_tbl.php`
      tabla1.setEstructuraJson(tablaDetail1)
      //tabla1.descargarFilasBD()

  }

  function getAlumnosGeneracion() {
    var tablaDetail2 = [
      {
        titulo:`Usuario`,
        name:`nombre`,
        orderable:true,
        bOrder:`asc`,
        search:[{tipo:`input`,value:``,type:`text`,propierties:``}],
        width:`50%`         
      },
      {
        titulo:`Estado`,
        name:`estado`,
        orderable:true,
        value:``,
        search:[{tipo:`select`,value:``,propierties:``,
          options:[
            {value:``,propierties:``,text:`Estado`},
            {value:`A`,propierties:``,text:`Activo`},                
            {value:`I`,propierties:``,text:`Inactivo`}
            ]
        }],
        width:`20%`
      },
      {
        titulo:`Avance`,
        name:`avance`,
        orderable:true,        
        search:[{tipo:`select`,value:``,propierties:``,
          options:[
            {value:``,propierties:``,text:`TODOS`},
            {value:`99.99`,propierties:``,text:`Menores a 100`},                
            {value:`90.01`,propierties:``,text:`Menores a 90`},
            {value:`80.01`,propierties:``,text:`Menores a 80`},
            {value:`50.01`,propierties:``,text:`Menores a 50`}
            ]
        }],  
        width:`15%`       
      },
      {
        titulo:``,
        name:``,
        orderable:false,       
        
        width:`15%`       
      }
  
    ]
  
    var tabla2 = document.querySelector(`#tabla-uc3g-2`)
    tabla2.data_personalizada = [
      {name:`action`,value:`listAlumnosMo17`},
      {name:`ejercicio_inicio`,value:`0001`},
      {name:`periodo_inicio`,value:`00`},
      {name:`id_carrera`,value:`88`}
    ]
    tabla2.url = `http://10.10.10.74/UC3G/views/tbl/mo17_tbl.php`
    tabla2.setEstructuraJson(tablaDetail2,true)
  }
  
    
  </script>';
}
