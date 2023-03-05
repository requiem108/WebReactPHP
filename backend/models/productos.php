<?php
//Api Laboratorios para el proyecto de la web TOM
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
error_log("productos.php");
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


switch($action){

    case 'addProducto':
        require_once("../helpers/conn.php");
        $db = Conexion::Conectar();
        echo addProducto($db, $dataObject);
        $db=null;
        break;

    case 'getProductosAdmin':
        require_once("../helpers/conn.php");
        $db = Conexion::Conectar();
        echo getProductosAdmin($db, $dataObject);
        $db=null;
        break;
    
    case 'actualizarProducto':      
        require_once("../helpers/conn.php");
        $db = Conexion::Conectar();
        echo actualizarProducto($db, $dataObject);
        $db=null;
        break;

    case 'uploadImage':
        require_once("../helpers/conn.php");
        $db = Conexion::Conectar();
        echo uploadImage($db, $dataObject);
        $db=null;
        break;

    case 'eliminarProducto':
        require_once("../helpers/conn.php");
        $db = Conexion::Conectar();
        echo eliminarProducto($db, $dataObject);
        $db=null;
        break;
}

/*---------FUNCIONES----------------- */

function addProducto(PDO $db,$dataObject){
    $pruebas = true;  
    try
    {
        // Set the error mode to exceptions
        //$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //Validate Token
        $res = array();
        $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);

  
        if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
            throw new Exception($res['token_validation']);
        }  
        
        $stmt = $db->prepare("INSERT INTO Productos (idLaboratorios_fk, nombre, descripcion, descripcion_corta, estado, imagen) 
        VALUES (:idLaboratorios_fk,:nombre,:descripcion,:descripcion_corta, :estado, :imagen)");    
      
        $stmt->execute(array(    
            ':idLaboratorios_fk' => '0',        
            ':nombre' => 'Nombre', 
            ':descripcion' => '',        
            ':descripcion_corta' => '',   
            ':estado' => 'A',
            ':imagen' => ''
        ));
        // Obtener el ID del producto insertado
        $idProducto = $db->lastInsertId();

        // Insertar una fila en la tabla Categorias_Producto_Pertenece con el ID del producto y la categoría 1
        $stmt2 = $db->prepare("INSERT INTO categorias_productos_pertenece (idCategoria_fk, idProducto_fk) 
        VALUES (:idCategoria,:idProducto)");    
      
        $stmt2->execute(array(    
            ':idCategoria' => '1',        
            ':idProducto' => $idProducto
        ));

        $res['ERROR'] = '';
        $res['comentario'] = 'Producto agregado correctamente';
    }
    catch (Exception $e)
    {
       $res['ERROR'] = $e->getMessage();
       $res['comentario'] = 'Error al agregar producto';
    }
       
    return json_encode($res);
}

function getProductosAdmin($db,$dataObject){
    $pruebas = true;  
    try
    {
        //Validate Token
        $res = array();
        $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);

        //variable con la url global
        $url_models = _Global_::$url_models;

        if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
            throw new Exception($res['token_validation']);
        }        
        $tipo = validarTipoUsuario($db,$dataObject->usuario);      
        return listProductos($db,$tipo,$url_models,$dataObject);        
    }
    catch (Exception $e)
    {
       $res['error'] = $e->getMessage();
       $res['data_usuario'] = array();
    }
       
    return json_encode($res);
}

function actualizarProducto(PDO $db, $dataObject) {
  $idProducto = $dataObject->dataid_producto;
  $campo = $dataObject->datadato;
  $valor = $dataObject->value;
 
  $pruebas = true;
  //depurar db
  //$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  try {
    //Validate Token
    $res = array();
    $res['token_validation'] = _Global_::validateToken($dataObject->datatoken, $dataObject->dataidusertoken, $db);


    if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
        throw new Exception($res['token_validation']);
    } 

    if ($campo === "categoria") {
      // Actualizar la categoría en la tabla Categorias_Producto_Pertenece
      $stmt = $db->prepare("UPDATE Categorias_Productos_Pertenece SET idCategoria_fk = :categoria WHERE idProducto_fk = :idProducto");
      $stmt->execute(array(':categoria' => $valor, ':idProducto' => $idProducto));
      $mensaje = "La categoría del producto con ID $idProducto ha sido actualizada correctamente.";
    } else {
      // Actualizar el campo en la tabla Productos
      $stmt = $db->prepare("UPDATE Productos SET $campo = :valor WHERE idProducto = :idProducto");
      $stmt->execute(array(':valor' => $valor, ':idProducto' => $idProducto));
      $mensaje = "El campo '$campo' del producto con ID $idProducto ha sido actualizado correctamente.";
    }

    // Devolver un mensaje de éxito
    $res['ERROR'] = '';
    $res['comentario'] = 'Producto actualizado correctamente';
  } catch (PDOException $e) {
    // Si se produce un error, devolver un mensaje de error
    $res['ERROR'] = $e->getMessage();
    $res['comentario'] = 'Error al agregar producto';
  }

  return json_encode($res);
}

function uploadImage($db,$dataObject){
  $pruebas = true;
  //print("<pre>".print_r($dataObject,true)."</pre>");  
  $nombreArchivo = 'proID'.$dataObject->idProducto;
  //print("<pre>".print_r($_FILES['file'],true)."</pre>");
  $rutaIMG = '../images/imgProductos/';

  try
  {
      //Validate Token
      $res = array();
      $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);


      if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
          throw new Exception($res['token_validation']);
      }  

      //Verifica que el directorio exista
      if (!file_exists($rutaIMG)) {
          mkdir($rutaIMG, 0777, true);
      }

      //Se guarda la imagen en el servidor
      $resIMG = _Global_::uploadImage($_FILES['file'],$rutaIMG,$nombreArchivo);
      if(!$resIMG['success']){
          throw new Exception($resIMG['error']);
      }
      
      //se guarda la ruta de la imagen en la base de datos
      $stmt = $db->prepare("UPDATE Productos SET imagen = :imagen WHERE idProducto = :id");    
    
      $stmt->execute(array(            
          ':id' => $dataObject->idProducto,            
          ':imagen' => $resIMG['nombre']
      ));
      
      $res['ERROR'] = '';
      $res['comentario'] = "Imagen subida correctamente";
         
  }
  catch (Exception $e)
  {
      $res['ERROR'] = 'ERROR';
     $res['error'] = $e->getMessage();
     $res['data_usuario'] = array();
  }
     
  return json_encode($res);
}

function eliminarProducto(PDO $db, $dataObject) {
  $idProducto = $dataObject->idProducto;
  $pruebas = true;
  //depurar db
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  try {
    //Validate Token
    $res = array();
    $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);

    if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
      throw new Exception($res['token_validation']);
    } 

    // Eliminar el producto de la tabla Productos
    $stmt = $db->prepare("UPDATE Productos set estado = 'I' WHERE idProducto = :idProducto");
    $stmt->execute(array(':idProducto' => $idProducto));

    $res['ERROR'] = '';
    $res['comentario'] = "Producto eliminado";
  } catch (PDOException $e) {
    // Si se produce un error, devolver un mensaje de error
    $res['ERROR'] = $e->getMessage();
    $res['comentario'] = 'Error al eliminar producto';
  }

  return json_encode($res);
}

/*---------FUNCIONES DE APOYO----------------- */

function listProductos($db, $tipo, $url_models, $dataObject) {
    $token = $dataObject->token; 
    $usuarioToken = $dataObject->usuario;    
    // --- CAMPOS QUE SE USAN PARA FILTRADO DE INFORMACION (importa el orden, deve coincidir con la tabla) --- //
    $aColumnas = array(    
      'pr.DESCRIPCION_CORTA',             
      'lab.NOMBRE as LABORATORIO',      
      'pr.DESCRIPCION',
      'ca.DESCRIPCION as CATEGORIA',
      'pr.IDPRODUCTO',
      'lab.IDLABORATORIOS',
      'ca.IDCATEGORIA',
      'pr.IMAGEN',
    );
    $sIndexColumn = "pr.IDPRODUCTO"; // --- CAMPO QUE SE USA COMO INDICE PARA LA TABLA --- //
    // --- NOMBRE DE LA TABLA PRINCIPAL SOBRE LA QUE SE CONTARAN LOS REGISTROS --- //
    $sTable = "from productos pr
    inner join laboratorios lab on pr.idLaboratorios_fk = lab.idLaboratorios
    inner join categorias_productos_pertenece cpp on pr.idProducto = cpp.idProducto_fk
    inner join categorias ca on cpp.idCategoria_fk = ca.idCategoria";      

    // --- PAGINACION --- //
    $sLimit = "";
    if( isset( $_GET['start'] ) && $_GET['length'] != '-1' ){
      $sLimit = "LIMIT ".intval( $_GET['length'] )." offset ".intval( $_GET['start']);
    }

    // --- FILTRADO POR COLUMNA --- //
    $ColumnasFiltro = $_GET['columns'];
    $sWhere = "where pr.estado = 'A' and lab.estado = 'A'";
    foreach($ColumnasFiltro as $IdColumna => $aColumna){
      if(isset($aColumna['searchable']) and $aColumna['searchable'] == 'true' and  $aColumna['search']['value'] != ''){
        if( $sWhere == "" ){
          $sWhere = "where ";
        }else{
          $sWhere .= " and ";
        }
        /* FILTRAR POR TIPO DE DATO AUTOMATICAMENTE */
        if(is_numeric($aColumna['search']['value'])){
          $sWhere .= $aColumnas[$IdColumna]." <= '".$aColumna['search']['value']."'";
        } else {
          if (DateTime::createFromFormat('Y-m-d H:i:s', $aColumna['search']['value']) !== FALSE) {
            // it's a date
            $sWhere .= $aColumnas[$IdColumna]." = to_date('".$aColumna['search']['value']."','dd/mm/yyyy')";
          } else {
            $sWhere .= "upper(".$aColumnas[$IdColumna].") like upper('%".$aColumna['search']['value']."%')";
          }
        }
      }
    }

    // --- ORDENAMIENTO --- //
    $sOrder = "";
    if( isset( $_GET['order'][0]['column'] ) ){
      $sOrder = "order by ".$aColumnas[$_GET['order'][0]['column']]." ".$_GET['order'][0]['dir'];
    }

    // --- CANTIDAD TOTAL DE REGISTROS --- //
    $sQuery = " select count(*) $sTable";
    $stmt = $db->prepare($sQuery);
    $stmt->execute();
    $iTotal = $stmt->fetchColumn();   

    // --- CANTIDAD TOTAL DE REGISTROS RECUPERADOS --- //
    $sQuery = "
      select count($sIndexColumn)   
      $sWhere
    ";
    $stmt = $db->prepare($sQuery);
    $stmt->execute();
    $nrows = $stmt->fetchColumn();  

    // --- CONTENIDO A RECUPERAR --- //
    /* BUILD QUERY DINAMICALLY */
    $Sel = "";
    foreach($aColumnas as $Indice => $Columna){
     
        $Sel .= " $Columna, ";
      
    }
   

    $sQuery = "SELECT
          $Sel
          $sIndexColumn as IDTAG
        $sTable       
        $sWhere
        $sOrder
        $sLimit
      ";
    //$results=$db->Execute($sQuery);
    $stmt = $db->prepare($sQuery);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // --- DETALLE DE REGISTROS MOSTRADOS --- //
    $output = array(
        "iTotalRecords" => $iTotal,
        "iTotalDisplayRecords" => $nrows,
        "aaData" => array()
      );    
    

      foreach ($result as $Fila) {
        $row=array();   
       
        
       //$tipo = false;
        if($tipo){
          //Administrador
          $descripcion_corta = '<input data-datadato="descripcion_corta" data-dataidusertoken="'.$usuarioToken.'" data-datatoken="'.$token.'" data-dataid_producto="'.$Fila['IDPRODUCTO'].'"  style="width:80%;display:block;margin:auto;" is="input-uc3g" maxlength="20" url="'.$url_models.'productos.php" action="actualizarProducto" docode type="text" value="'.$Fila['DESCRIPCION_CORTA'].'"/>';
          
          //--OBTENERMOS LOS LABORATIOS EN UN SELECT---//
          $selectLaboratorios = getSelectLaboratorios($db, $Fila['LABORATORIO'],$url_models,$usuarioToken,$token,$Fila['IDPRODUCTO']);

          //--OBTENERMOS LAS CATEGORIAS EN UN SELECT---//
          $selectCategorias = getSelectCategorias($db, $Fila['CATEGORIA'],$url_models,$usuarioToken,$token,$Fila['IDPRODUCTO']);

          $descripcion_ = '<textarea rows="3" data-datadato="descripcion" data-dataidusertoken="'.$usuarioToken.'" data-datatoken="'.$token.'" data-dataid_producto="'.$Fila['IDPRODUCTO'].'"  style="width:80%;display:block;margin:auto;" is="textarea-uc3g" maxlength="120" url="'.$url_models.'productos.php" action="actualizarProducto" docode >'.$Fila['DESCRIPCION'].'</textarea>';
          $img_producto = $Fila['IMAGEN'] != ''?'<button data-title="'.$Fila['DESCRIPCION_CORTA'].'" data-img="../images/imgProductos/'.$Fila['IMAGEN'].'" class="btn btn-primary admin-products-img">Ver imagen</button>':'';   
           
          $botones='
            <div class="d-md-flex flex-column-reverse justify-content-center align-items-center tabla-admin-botones">  
                <input type="file" accept="image/*" name="file" id="file" class="inputfile form-control admin-productos-img" data-id="'.$Fila['IDPRODUCTO'].'" data-accion="logo" data-token="'.$token.'" data-idusertoken="'.$usuarioToken.'"/>          
                '.$img_producto.'
                
                <button data-id="'.$Fila['IDPRODUCTO'].'" style="width:33px;" class="btn btn-danger rounded-pill admin-productos-eliminar">X</button>
            </div>';
        }else{
          //Auxiliar
          $descripcion_corta = '<span class="" title="">'.$Fila['DESCRIPCION_CORTA'].'</span>';
          $selectLaboratorios = '<span class="" title="">'.$Fila['LABORATORIO'].'</span>';
          $selectCategorias = '<span class="" title="">'.$Fila['CATEGORIA'].'</span>';
          $descripcion_ = '<span class="" title="">'.$Fila['DESCRIPCION'].'</span>';
          
          $botones='<div></div>';
        }
  
        
        $row[] = '<span style="text-aling:center;" class="" title="">'.$descripcion_corta.'</span>'; 
        $row[] = '<span class="">'.$selectLaboratorios.'</span>';  
        $row[] = '<span class="contenedor-btn" title="">'.$selectCategorias.'</span>';
        $row[] = '<span class="contenedor-btn" title="">'.$descripcion_.'</span>';
        $row[] = '<span class="contenedor-btn" title="">'.$botones.'</span>';
  
        $output['aaData'][] = $row;
      }
      
      //var_dump($output);
      return json_encode($output);
}

function validarTipoUsuario($conexion, $usuario) {  
  
  // Validar si el usuario es administrador o auxiliar utilizando una consulta preparada
  $stmt = $conexion->prepare("SELECT estado FROM Usuarios WHERE usuario = :usuario AND tipo = 'ADMINISTRADOR'");
  $stmt->execute(array(':usuario' => $usuario));

  // Obtener el resultado de la consulta
  $tipo = $stmt->fetch(PDO::FETCH_ASSOC);

  // Si el resultado no es nulo, el usuario es administrador o auxiliar, de lo contrario no lo es
  if ($tipo) {
    return true;
  } else {
    return false;
  }
}

function getSelectLaboratorios(PDO $db, $nombreL, $url_models,$usuarioToken,$token,$idProducto) {
  $laboratorios = array();
  try {
      $stmt = $db->prepare("SELECT idLaboratorios, nombre FROM Laboratorios WHERE estado = 'A'");
      $stmt->execute();
      $laboratorios = $stmt->fetchAll(PDO::FETCH_ASSOC);
  } catch (Exception $e) {
      // Handle the error here, e.g. log it, return an error message, etc.
  }

  
  $select = "<select name='laboratorio' is='select-uc3g' data-datadato='idLaboratorios_fk' url='".$url_models."productos.php' data-dataidusertoken='".$usuarioToken."' data-datatoken='".$token."' data-dataid_producto='".$idProducto."' action='actualizarProducto'>";
  foreach ($laboratorios as $lab) {
      $id = $lab['idLaboratorios'];
      $nombre = $lab['nombre'];
      $selected = $nombreL == $nombre ? 'selected' : '';
      $select .= "<option value='$id' $selected>$nombre</option>";
  }
  $select .= "</select>";

  return $select;
}

function getSelectCategorias(PDO $db, $nombreC,$url_models,$usuarioToken,$token,$idProducto) {
  $categorias = array();
  try {
      $stmt = $db->prepare("SELECT idCategoria, descripcion FROM categorias");
      $stmt->execute();
      $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
  } catch (Exception $e) {
      // Handle the error here, e.g. log it, return an error message, etc.
  }

  $select = "<select name='categoria' is='select-uc3g' data-datadato='categoria' url='".$url_models."productos.php' data-dataidusertoken='".$usuarioToken."' data-datatoken='".$token."' data-dataid_producto='".$idProducto."' action='actualizarProducto'>";
  foreach ($categorias as $cat) {
      $id = $cat['idCategoria'];
      $nombre = $cat['descripcion'];
      $selected = $nombreC == $nombre ? 'selected' : '';
      $select .= "<option value='$id' $selected>$nombre</option>";
  }
  $select .= "</select>";

  return $select;
}
?>