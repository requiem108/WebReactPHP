<?php
//Api usuarios para el proyecto de la web TOM
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

session_start();

require_once '../helpers/global.php';

//si en las opciones POST se encuentra action se toma este valor
if (isset($_POST['action'])) {
    $action = $_POST['action'];
    //convertir $_POST a objeto
    $dataObject = (object) $_POST;
} else if(isset($_GET['action'])){
    //si no se encuentra action en las opciones POST se toma el valor de action de las opciones GET
    $action = $_GET['action'];
    //$dataObject = json_decode($_GET['token']);
    $usuario = base64_decode(filter_input(INPUT_GET, 'usuario'));
    $token = base64_decode(filter_input(INPUT_GET, 'token'));
    $dataObject  = (object) ['token' => $token, 'usuario' => $usuario];
}else{
    $JSONData = file_get_contents("php://input");
    $dataObject = json_decode($JSONData);
    $action = $dataObject->action;
}

switch ($action) {
    case 'getLaboratorios':                     
        echo getLaboratorios('../images/Laboratorios');             
    break;

   
    
    default:
        //defautOption();
    break;
}

function getLaboratorios($directorio) {

    // Abre el directorio
    $dir = opendir($directorio);
    
    // Declara un array para almacenar los archivos
    $archivos = array();
    
    // Lee el contenido del directorio
    while (($archivo = readdir($dir)) !== false) {
      
      // Si el archivo no es un directorio y su extensión es .php, agrega su nombre al array
      if (!is_dir($directorio . '/' . $archivo) && pathinfo($archivo, PATHINFO_EXTENSION) === 'png') {
        $archivos[] = $archivo;
      }
    }
    
    // Cierra el directorio
    closedir($dir);
    
    // Convierte el array en formato JSON y lo regresa
    return json_encode($archivos);
  }