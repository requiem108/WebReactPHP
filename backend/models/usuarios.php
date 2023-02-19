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
    case 'getUsuarios':
        require_once '../helpers/conn.php';
        $db = Conexion::Conectar();                  
        echo getUsuarios($db,$dataObject );  
        $db=null;     
    break;

    case 'addUser':
        require_once '../helpers/conn.php';
        $db = Conexion::Conectar();                  
        echo addUser($db,$dataObject );  
        $db=null;
      # code...
      break;

    case 'update_usuarios':
      require_once '../helpers/conn.php';
      $db = Conexion::Conectar();                  
      echo update_usuarios($db,$dataObject);  
      $db=null;
      # code...
      break;
    
    case 'deleteUser':
      require_once '../helpers/conn.php';
      $db = Conexion::Conectar();                  
      echo deleteUser($db,$dataObject);  
      $db=null;
      break;

    case 'getPantallas':
      require_once '../helpers/conn.php';
      $db = Conexion::Conectar();                  
      echo getPantallas($db,$dataObject);  
      $db=null;
      break;
    
    default:
        //defautOption();
    break;
}


/*----------------------------------FUNCTIONS----------------------------------*/
function getUsuarios($db,$dataObject){
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
        return listUsuarios($db,$tipo,$url_models,$dataObject->token,$dataObject->usuario);        
    }
    catch (Exception $e)
    {
       $res['error'] = $e->getMessage();
       $res['data_usuario'] = array();
    }
       
    return json_encode($res);
}

function addUser($db,$dataObject){
    $pruebas = true; 
     
    try
    {
        //Validate Token
        $res = array();
        $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);

        if ($res['token_validation']['comentario'] === 'Token valido' and !$pruebas) {
            throw new Exception($res['Token invalido']);
        }        
        
        // Generar la clave automáticamente (opcional)
        $clave = uniqid();

         // Obtener la fecha actual
        $fecha = date('Y-m-d');

        $tipo = isset($dataObject->tipo) ? $dataObject->tipo : 'AUXILIAR';

        $stmt = $db->prepare("INSERT INTO Usuarios (clave, usuario, fecha, estado, tipo) VALUES (:clave, :usuario, :fecha, :estado, :tipo)");
        $stmt->execute(array(
          ':clave' => $clave,
          ':usuario' => 'nuevo usuario',
          ':fecha' => $fecha,
          ':estado' => 'A',
          ':tipo' => $tipo
        ));

          
        $res['error'] = '';       
    }
    catch (Exception $e)
    {
       $res['error'] = $e->getMessage();
       $res['data_usuario'] = array();
    }
       
    return json_encode($res);
}

function update_usuarios($db,$dataObject){
  //print("<pre>".print_r($dataObject,true)."</pre>");
  $res = array();
  $pruebas = true;
  $campo = $dataObject->datadato;
  $valor = $dataObject->value;
  $id_usuario = $dataObject->dataid_usuario;
  $usuarioToken = $dataObject->dataidusertoken;
  $token = $dataObject->datatoken;
  //$usuario = getUserById($db, $id_usuario);

    try {
      //Validate Token
      $res['token_validation'] = _Global_::validateToken($token, $usuarioToken, $db);
      if ($res['token_validation']['comentario'] === 'Token valido' and !$pruebas) {
        throw new Exception($res['Token invalido']);
      } 

      $stmt = $db->prepare("UPDATE Usuarios SET $campo = :valor WHERE id_usuario = :id_usuario");
      $stmt->bindParam(':valor', $valor);
      $stmt->bindParam(':id_usuario', $id_usuario);
      $stmt->execute();

      $res['comentario'] = "Actualizacion exitosa del campo $campo para el usuario con ID $id_usuario";
    } catch (Exception $e) {
        $res['comentario'] = "Error al actualizar el campo $campo para el usuario con ID $id_usuario: " . $e->getMessage();
    }
    return json_encode($res);
}

function deleteUser($db,$dataObject){
  $pruebas = true; 
    //print("<pre>".print_r($dataObject,true)."</pre>"); 
  try
  {
      //Validate Token
      $res = array();
      $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);

      if ($res['token_validation']['comentario'] === 'Token valido' and !$pruebas) {
          throw new Exception($res['Token invalido']);
      }        
      
      echo $id_usuario = $dataObject->id;

      $stmt = $db->prepare("DELETE FROM Usuarios WHERE id_usuario = :id_usuario");
      $stmt->bindParam(':id_usuario', $id_usuario);
      $stmt->execute();

      $res['error'] = '';       
  }
  catch (Exception $e)
  {
     $res['error'] = $e->getMessage();
     $res['data_usuario'] = array();
  }
     
  return json_encode($res);
}

function getPantallas($db, $dataObject) {
  $usuario = $dataObject->usuario;
  $token = $dataObject->token;
  $pantallas = array();

  // Validar el tipo de cuenta del usuario
  $stmt = $db->prepare("SELECT tipo FROM usuarios WHERE usuario = ?");
  $stmt->execute(array($usuario));
  $tipo_cuenta = $stmt->fetch(PDO::FETCH_ASSOC)['tipo'];

  $where = $tipo_cuenta == 'ADMINISTRADOR' ? '':'WHERE tipo_cuenta_fk = ?';

  // Obtener las pantallas correspondientes al tipo de cuenta
  $stmt = $db->prepare("SELECT * FROM pantallas $where");
  $stmt->execute(array($tipo_cuenta));
  $pantallas_bd = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // Recorrer las pantallas para obtener sus módulos
  foreach ($pantallas_bd as $pantalla) {
      $pantalla_modulos = array();

      // Obtener los módulos correspondientes a la pantalla
      $stmt = $db->prepare("SELECT * FROM pantalla_modulo WHERE id_pantalla_fk = ?");
      $stmt->execute(array($pantalla['idPantallas']));
      $pantalla_modulos_bd = $stmt->fetchAll(PDO::FETCH_ASSOC);

      // Recorrer los módulos de la pantalla
      foreach ($pantalla_modulos_bd as $pantalla_modulo) {
          $pantalla_modulos[] = array(
              'item' => $pantalla_modulo['nombre'],
          );
      }
      //print("<pre>".print_r($pantalla,true)."</pre>");
      // Agregar la pantalla con sus módulos al arreglo de pantallas
      $pantallas[] = array(
          'id' => $pantalla['idPantallas'],
          'tipo' => 'link',
          'texto' => $pantalla['nombre'],
          'link' => $pantalla['link'],
          'items' => $pantalla_modulos,
      );
  }

  return json_encode($pantallas);
}



/**FUNCRIONES DE APOYO */
function listUsuarios($db,$tipo,$url_models,$token,$usuarioToken){     

    // --- CAMPOS QUE SE USAN PARA FILTRADO DE INFORMACION (importa el orden, deve coincidir con la tabla) --- //
    $aColumnas = array(    
      'U.USUARIO',             
      'U.ESTADO',      
      'U.TIPO',
      'U.CLAVE', 
      'U.ID_USUARIO'
    );
    $sIndexColumn = "ID_USUARIO";
    // --- NOMBRE DE LA TABLA PRINCIPAL SOBRE LA QUE SE CONTARAN LOS REGISTROS --- //
    $sTable = "from USUARIOS U";      

    // --- PAGINACION --- //
    $sLimit = "";
    if( isset( $_GET['start'] ) && $_GET['length'] != '-1' ){
      $sLimit = "LIMIT ".intval( $_GET['length'] )." offset ".intval( $_GET['start']);
    }

    // --- FILTRADO POR COLUMNA --- //
    $ColumnasFiltro = $_GET['columns'];
    $sWhere = "";
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
        }else{
          if (DateTime::createFromFormat('Y-m-d H:i:s', $aColumna['search']['value']) !== FALSE) {
            // it's a date
            $sWhere .= $aColumnas[$IdColumna]." = to_date('".$aColumna['search']['value']."','dd/mm/yyyy')";
          }else{
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
      if( _Global_::limpiaId($Columna,'.') != 'DESCRIPCION'){
        $Sel .= " $Columna as ". _Global_::limpiaId($Columna,'.').",";
      }else{
        $Sel .= " $Columna, ";
      }
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

    // --- SALIDA DE CONTENIDO GENERADO --- //
    foreach ($result as $Fila) {
      $row=array();   
      
      $estado = $Fila['ESTADO'] == 'A'? 'Activo' : 'Inactivo';

      $usuario_c='TEST';
      if($tipo){
        //Administrador
        $usuario_c = '<input data-datadato="usuario"  data-datatoken="'.$token.'" data-dataid_usuario="'.$Fila['ID_USUARIO'].'" data-dataidusertoken="'.$usuarioToken.'" class="mas-admin-usuarios" style="width:80%;display:block;margin:auto;" is="input-uc3g" maxlength="20" url="'.$url_models.'usuarios.php" action="update_usuarios" docode type="text" value="'.$Fila['USUARIO'].'"/>';
        $estado_c = '<select data-datadato="estado" data-datatoken="'.$token.'" data-dataid_usuario="'.$Fila['ID_USUARIO'].'" data-dataidusertoken="'.$usuarioToken.'" class="mas-admin-usuarios" style="width:80%;display:block;margin:auto;" is="select-uc3g" url="'.$url_models.'usuarios.php" action="update_usuarios" docode>
                        <option value="A" '.($Fila['ESTADO'] == 'A'? 'selected' : '').'>Activo</option>
                        <option value="I" '.($Fila['ESTADO'] == 'I'? 'selected' : '').'>Inactivo</option>
                      </select>';
        $tipo_c = '<select data-dataidusertoken="'.$usuarioToken.'" data-datadato="tipo" data-datatoken="'.$token.'" data-dataid_usuario="'.$Fila['ID_USUARIO'].'" class="mas-admin-usuarios" style="width:80%;display:block;margin:auto;" is="select-uc3g" url="'.$url_models.'usuarios.php" action="update_usuarios" docode>
                        <option value="A" '.($Fila['TIPO'] == 'ADMINISTRADOR'? 'selected' : '').'>Administrador</option>
                        <option value="U" '.($Fila['TIPO'] == 'AUXILIAR'? 'selected' : '').'>Auxiliar</option>
                      </select>';
        $botones='<div d-md-flex justify-content-center><button data-id="'.$Fila['ID_USUARIO'].'" style="width:33px;" class="btn btn-danger rounded-pill admin-user-eliminar">X</button></div>';
      }else{
        //Auxiliar
        $usuario_c = '<span class="" title="">'.$Fila['USUARIO'].'</span>';
        $estado_c = '<span class="" title="">'.$estado.'</span>';
        $tipo_c = '<span class="" title="">'.$Fila['TIPO'].'</span>';
        $botones='<div></div>';
      }

      $row[] = $usuario_c;
      $row[] = '<span style="text-aling:center;" class="" title="">'.$Fila['CLAVE'].'</span>';
      //$row[] = '<span class="" title="">'.$dataAvance['avance'].'%</span>';
      $row[] = '<span class="">'.$estado_c.'</span>';
      $row[] = '<span class="contenedor-btn" title="">'.$tipo_c.'</span>';
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

function getUserById($db, $id_usuario) {
  $query = "SELECT * FROM Usuarios WHERE id_usuario = :id_usuario";
  $stmt = $db->prepare($query);
  $stmt->bindParam(':id_usuario', $id_usuario);
  $stmt->execute();

  $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

  return $usuario;
}
