<?php
//Api Laboratorios para el proyecto de la web TOM
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

    //comvinar $dataObject con $_GET conservando los valores de $dataObject
    $dataObject = array();    
    $dataObject = (object) array_merge((array) $dataObject, (array) $_GET);
    $dataObject->usuario = $usuario;
    $dataObject->token = $token;
    
}else{
    $JSONData = file_get_contents("php://input");
    $dataObject = json_decode($JSONData);
    $action = $dataObject->action;
}


switch($action){

    case 'addNoticia':
        require_once("../helpers/conn.php");
        $db = Conexion::Conectar();
        echo addNoticia($db, $dataObject);
        $db=null;
        break;

    case 'getNoticias':
        require_once("../helpers/conn.php");
        $db = Conexion::Conectar();
        echo getNoticias($db, $dataObject);
        $db=null;
        break;

    case 'updateNoticia':
        require_once("../helpers/conn.php");
        $db = Conexion::Conectar();
        echo updateNoticia($db, $dataObject, $dataObject->id_noticias);
        $db=null;
        break;

    case 'updateEstado':
        require_once("../helpers/conn.php");
        $db = Conexion::Conectar();
        echo updateEstado($db, $dataObject);
        $db=null;
        break;

    case 'getNoticiasWeb':
        require_once("../helpers/conn.php");
        $db = Conexion::Conectar();
        echo getNoticiasWeb($db, $dataObject);
        $db=null;
        break;
}

/**FUNCIONES INDICE */

function addNoticia($db, $dataObject){
    //print("<pre>".print_r($_FILES,true)."</pre>");
    $pruebas = false;
    try{
        //Validate Token
        $res = array();
        $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);

  
        if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
            throw new Exception($res['token_validation']);
        }  

        //Insertar noticia
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->beginTransaction();
        $sql = "INSERT INTO noticias (titulo, contenido, autor, estado) VALUES (:titulo, :contenido, :autor, 'b')";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':titulo', $dataObject->titulo);
        $stmt->bindParam(':contenido', $dataObject->contenido);
        $stmt->bindParam(':autor', $dataObject->autor);
        $stmt->execute();
        $idNoticia = $db->lastInsertId();
        
        if($idNoticia > 0){
            $res['idNoticia'] = $idNoticia;
            $res['titulo'] = $dataObject->titulo;
            $res['contenido'] = $dataObject->contenido;
            $res['autor'] = $dataObject->autor;
        }else{
            $res['error'] = "No se ha podido insertar la noticia";
            throw new Exception("No se ha podido insertar la noticia");
        }

        //Insertar imagenes
        $nombreArchivo = 'NoticiaID_'.$idNoticia;
        $rutaIMG = '../images/imgNoticias/';

        //Verifica que el directorio exista
        if (!file_exists($rutaIMG)) {
            mkdir($rutaIMG, 0777, true);
        }

        //Se guarda la imagen en el servidor
        $resIMG = _Global_::uploadImage($_FILES['imagen'],$rutaIMG,$nombreArchivo);
        if(!$resIMG['success']){
            throw new Exception($resIMG['error']);
        }

        //Se actualiza la ruta de la imagen en la tabla noticias
        $sql = "UPDATE noticias SET imagen = :imagen WHERE id_noticias = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':imagen', $resIMG['nombre']);
        $stmt->bindParam(':id', $idNoticia);
        $stmt->execute();

        $res['imagen'] = $resIMG['nombre'];

        $db->commit();          
        $res['ERROR'] = '';
    }catch(Exception $e){

        $db->rollBack();
        $res['ERROR'] = 'ERROR';
        $res['error'] = $e->getMessage();
       
    }
    return json_encode($res);
     
}

function updateNoticia($db, $dataObject, $idNoticia) {
    //print("<pre>".print_r($_FILES,true)."</pre>");
    $pruebas = false;
    try{
        //Validate Token
        $res = array();
        $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);

        if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
            throw new Exception($res['token_validation']);
        }  

        // Actualizar noticia
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->beginTransaction();
        $sql = "UPDATE noticias SET titulo = :titulo, contenido = :contenido, autor = :autor WHERE id_noticias = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':titulo', $dataObject->titulo);
        $stmt->bindParam(':contenido', $dataObject->contenido);
        $stmt->bindParam(':autor', $dataObject->autor);
        $stmt->bindParam(':id', $idNoticia);
        $stmt->execute();
        
        $res['idNoticia'] = $idNoticia;
        $res['titulo'] = $dataObject->titulo;
        $res['contenido'] = $dataObject->contenido;
        $res['autor'] = $dataObject->autor;

        // Actualizar imagen
        if(isset($_FILES['imagen']) && $_FILES['imagen']['size'] > 0) {
            $nombreArchivo = 'NoticiaID_'.$idNoticia;
            $rutaIMG = '../images/imgNoticias/';

            //Verifica que el directorio exista
            if (!file_exists($rutaIMG)) {
                mkdir($rutaIMG, 0777, true);
            }

            //Se guarda la imagen en el servidor
            $resIMG = _Global_::uploadImage($_FILES['imagen'],$rutaIMG,$nombreArchivo);
            if(!$resIMG['success']){
                throw new Exception($resIMG['error']);
            }

            //Se actualiza la ruta de la imagen en la tabla noticias
            $sql = "UPDATE noticias SET imagen = :imagen WHERE id_noticias = :id";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':imagen', $resIMG['nombre']);
            $stmt->bindParam(':id', $idNoticia);
            $stmt->execute();

            $res['imagen'] = $resIMG['nombre'];
        }

        $db->commit();          
        $res['ERROR'] = '';
    }catch(Exception $e){

        $db->rollBack();
        $res['ERROR'] = 'ERROR';
        $res['error'] = $e->getMessage();
        return $e->getMessage();
    }
    return json_encode($res);
}

function getNoticias($db, $dataObject) {
    $res = array();
    $res['ERROR'] = '';
    $res['comentario'] = '';
    $pruebas = true;
 
    try {
      $ni = $dataObject->ni;
      $nf = $dataObject->nf;
      
      //Validate Token     
      $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);


      if ($res['token_validation'] !== 'Token valido' and !$pruebas) {       
        throw new Exception($res['token_validation']);
      } 
  
      //$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sql = "SELECT id_noticias, titulo, COALESCE(DATE_FORMAT(fecha_publicacion, '%d/%m/%Y'), DATE_FORMAT(NOW(), '%d/%m/%Y')) AS fecha_publicacion,
        contenido,
        autor, imagen, estado 
      FROM noticias 
      ORDER BY id_noticias DESC 
      LIMIT $ni, $nf";

      $stmt = $db->prepare($sql);
      $stmt->execute();
  
      $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
      
      $res['data'] = $data;
      $res['comentario'] = 'Consulta exitosa';
    } catch (Exception $e) {
      $res['ERROR'] = 'ERROR';
      $res['comentario'] = 'Error al realizar la consulta: ' . $e->getMessage();
    }
  
    return json_encode($res);
}

function updateEstado(PDO $db, $dataObject) {
    try {
      $idNoticia = $dataObject->id_noticia;
      $estado = $dataObject->estado;
      $fechaPublicacion = date("d/m/Y");
      $pruebas = false;

      
      //Validate Token     
      $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);
      
      if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
          throw new Exception($res['token_validation']);
      } 
  
      $sql = "UPDATE noticias SET estado = :estado, fecha_publicacion = CURRENT_TIMESTAMP() WHERE id_noticias = :id_noticia";
      $stmt = $db->prepare($sql);
      $stmt->bindParam(':estado', $estado);
      //$stmt->bindParam(':fecha_publicacion', $fechaPublicacion);
      $stmt->bindParam(':id_noticia', $idNoticia);
      $stmt->execute();
  
      $res['ERROR'] = '';
      $res['comentario'] = "Estado actualizado correctamente.";
      $res['fecha'] = $fechaPublicacion;
      return json_encode($res);
    } catch (Exception $e) {
      $res['ERROR'] = 'ERROR';
      $res['comentario'] = "Error al actualizar el estado: " . $e->getMessage();
      return json_encode($res);
    }
}

function getNoticiasWeb($db, $dataObject) {
    $res = array();
    $res['ERROR'] = '';
    $res['comentario'] = '';
    $pruebas = true;
 
    try {
      $ni = $dataObject->ni;
      $nf = $dataObject->nf;    
  
      //$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sql = "SELECT id_noticias, titulo, COALESCE(DATE_FORMAT(fecha_publicacion, '%d/%m/%Y'), DATE_FORMAT(NOW(), '%d/%m/%Y')) AS fecha_publicacion,
        contenido,
        autor, imagen, estado 
      FROM noticias 
      where estado = 'p'
      ORDER BY id_noticias DESC 
      LIMIT $ni, $nf"
      ;

      $stmt = $db->prepare($sql);
      $stmt->execute();
  
      $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
      
      $res['data'] = $data;
      $res['comentario'] = 'Consulta exitosa';
    } catch (Exception $e) {
      $res['ERROR'] = 'ERROR';
      $res['comentario'] = 'Error al realizar la consulta: ' . $e->getMessage();
    }
  
    return json_encode($res);
}

  




  /* FUNCIONES APOYO */

