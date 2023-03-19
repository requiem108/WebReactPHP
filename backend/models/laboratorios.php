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
    $dataObject  = (object) ['token' => $token, 'usuario' => $usuario];
}else{
    $JSONData = file_get_contents("php://input");
    $dataObject = json_decode($JSONData);
    $action = $dataObject->action;
}



switch ($action) {    

    case 'getLaboratorios':
        require_once '../helpers/conn.php';
        $db = Conexion::Conectar();                  
        echo getLaboratorios($db,$dataObject );  
        $db=null;
    break;
    
    case 'addLaboratorio':
        require_once '../helpers/conn.php';
        $db = Conexion::Conectar();                  
        echo addLaboratorio($db,$dataObject );  
        $db=null;
    break;

    case 'actualizarNombre':
        require_once '../helpers/conn.php';
        $db = Conexion::Conectar();                  
        echo actualizarNombre($db,$dataObject );  
        $db=null;
    break;

    case 'deleteLaboratorio':
        require_once '../helpers/conn.php';
        $db = Conexion::Conectar();                  
        echo deleteLaboratorio($db,$dataObject );  
        $db=null;
    break;

    case 'uploadImage':
        require_once '../helpers/conn.php';
        $db = Conexion::Conectar();                  
        echo uploadImage($db,$dataObject );  
        $db=null;
    default:
        //defautOption();
    break;
}


/*---------------------------------FUNCIONES---------------------------------*/
function getLaboratorios($db,$dataObject){
    $pruebas = false;  
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
        return listLaboratorios($db,$tipo,$url_models,$dataObject->token,$dataObject->usuario);        
    }
    catch (Exception $e)
    {
      $res['ERROR'] = 'ERROR';
       $res['error'] = $e->getMessage();
       $res['data_usuario'] = array();
    }
       
    return json_encode($res);
}

function addLaboratorio(PDO $db,$dataObject){
    $pruebas = false;  
    try
    {
        //Validate Token
        $res = array();
        $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);

  
        if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
            throw new Exception($res['token_validation']);
        }  
        
        $stmt = $db->prepare("INSERT INTO Laboratorios (nombre, estado, logo) 
        VALUES (:nombre, :estado, :logo)");    
      
        $stmt->execute(array(            
            ':nombre' => 'Nombre Laboratorio',            
            ':estado' => 'A',
            ':logo' => ''
        ));
        return $db->lastInsertId();
           
    }
    catch (Exception $e)
    {
      $res['ERROR'] = 'ERROR';
       $res['error'] = $e->getMessage();
       $res['data_usuario'] = array();
    }
       
    return json_encode($res);
}

function actualizarNombre(PDO $db, $dataObject) {
    $pruebas = false;
    $id = $dataObject->dataid_lab;
    $nuevoNombre = $dataObject->value;
    $token = $dataObject->datatoken;
    $usuarioToken = $dataObject->dataidusertoken;
    try {
        //Validate Token
        
        $res = array();
        $res['token_validation'] = _Global_::validateToken($token, $usuarioToken, $db);

  
        if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
            throw new Exception($res['token_validation']);
        }

        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $db->prepare("UPDATE Laboratorios SET nombre = :nuevo_nombre WHERE idLaboratorios = :id");
        $stmt->bindParam(":nuevo_nombre", $nuevoNombre);
        $stmt->bindParam(":id", $id);
        $ok = $stmt->execute();        
        
        $res['ERROR'] = '';
        $res['comentario'] = "Laboratorio actualizado correctamente";
       
    } catch (Exception $e) {        
        $res['ERROR'] = 'ERROR';
        $res['comentario'] = $e->getMessage();
    }
    return json_encode($res);
}

function deleteLaboratorio($db,$dataObject){
    $pruebas = false;  
    try
    {
        //Validate Token
        $res = array();
        $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);

  
        if ($res['token_validation'] !== 'Token valido' and !$pruebas) {
            throw new Exception($res['token_validation']);
        }  
        
        $stmt = $db->prepare("DELETE FROM Laboratorios WHERE idLaboratorios = :id");    
      
        $stmt->execute(array(            
            ':id' => $dataObject->idLaboratorios,            
        ));
        
        $res['ERROR'] = '';
        $res['comentario'] = "Laboratorio eliminado correctamente";
           
    }
    catch (Exception $e)
    {
        $res['ERROR'] = 'ERROR';
       $res['error'] = $e->getMessage();
       $res['data_usuario'] = array();
    }
       
    return json_encode($res);
}

function uploadImage($db,$dataObject){
    $pruebas = false;
    //print("<pre>".print_r($dataObject,true)."</pre>");  
    $nombreArchivo = 'LabID'.$dataObject->idLaboratorios;
    //print("<pre>".print_r($_FILES['file'],true)."</pre>");
    $rutaIMG = '../images/imgLogos/';
 
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
        $stmt = $db->prepare("UPDATE Laboratorios SET logo = :logo WHERE idLaboratorios = :id");    
      
        $stmt->execute(array(            
            ':id' => $dataObject->idLaboratorios,            
            ':logo' => $resIMG['nombre']
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

/**FUNCIONES DE APOYO */
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

function listLaboratorios($db, $tipo, $url_models, $token, $usuarioToken) {
    // --- CAMPOS QUE SE USAN PARA FILTRADO DE INFORMACION (importa el orden, deve coincidir con la tabla) --- //
    $aColumnas = array(    
      'F.NOMBRE',             
      'F.ESTADO',      
      'F.LOGO',
      'F.IDLABORATORIOS',
    );
    $sIndexColumn = "IDLABORATORIOS"; // --- CAMPO QUE SE USA COMO INDICE PARA LA TABLA --- //
    // --- NOMBRE DE LA TABLA PRINCIPAL SOBRE LA QUE SE CONTARAN LOS REGISTROS --- //
    $sTable = "from LABORATORIOS F";      

    // --- PAGINACION --- //
    $sLimit = "";
    if( isset( $_GET['start'] ) && $_GET['length'] != '-1' ){
      $sLimit = "LIMIT ".intval( $_GET['length'] )." offset ".intval( $_GET['start']);
    }

    // --- FILTRADO POR COLUMNA --- //
    $ColumnasFiltro = $_GET['columns'];
    $sWhere = "Where idLaboratorios <> 0 ";
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

      foreach ($result as $Fila) {
        $row=array();   
        
        $estado = $Fila['ESTADO'] == 'A'? 'Activo' : 'Inactivo';
  
        $usuario_c='TEST';
        if($tipo){
          //Administrador
          $nombre_c = '<input data-datadato="usuario" data-dataidusertoken="'.$usuarioToken.'" data-datatoken="'.$token.'" data-dataid_lab="'.$Fila['IDLABORATORIOS'].'"  style="width:80%;display:block;margin:auto;" is="input-uc3g" maxlength="20" url="'.$url_models.'laboratorios.php" action="actualizarNombre" docode type="text" value="'.$Fila['NOMBRE'].'"/>';
          $estado_c = '<select data-datadato="estado" data-dataidusertoken="'.$usuarioToken.'" data-datatoken="'.$token.'" data-dataid_lab="'.$Fila['IDLABORATORIOS'].'"  style="width:80%;display:block;margin:auto;" is="select-uc3g" url="'.$url_models.'laboratorios.php" action="update_laboratorios" docode>
                          <option value="A" '.($Fila['ESTADO'] == 'A'? 'selected' : '').'>Activo</option>
                          <option value="I" '.($Fila['ESTADO'] == 'I'? 'selected' : '').'>Inactivo</option>
                        </select>'; 
         
          $logoArray =  explode(".", $Fila['LOGO']); 
          $inputlogo = '<input type="file" accept="image/*" name="file" id="file" class="inputfile form-control admin-Lab-logo" data-id="'.$Fila['IDLABORATORIOS'].'" data-accion="logo" data-url="'.$url_models.'laboratorios.php" data-token="'.$token.'" data-idusertoken="'.$usuarioToken.'"/>';         
          if(count($logoArray) == 1){
            //  echo 'Vacio';
              $logo = '<div class="d-flex flex-column">
                <p>Sin logo agregado</p>
                '.$inputlogo.'
              </div>';
          }else{
            //echo 'No vacio';
            $logo = '<div class="d-flex flex-column align-items-center bg-dark" style"min-height:75px">
              <img src="../images/imgLogos/'.$Fila['LOGO'].'?V='.mt_rand().'" style="width:100px;">
              '.$inputlogo.'
            </div>';
          }                 
           
          $botones='
            <div class="d-md-flex justify-content-center tabla-admin-botones">                
                <button data-id="'.$Fila['IDLABORATORIOS'].'" style="width:33px;" class="btn btn-danger rounded-pill admin-Lab-eliminar">X</button>
            </div>';
        }else{
          //Auxiliar
          $nombre_c = '<span class="" title="">'.$Fila['NOMBRE'].'</span>';
          $estado_c = '<span class="" title="">'.$estado.'</span>';  //Estado no se coloca pero se deja por si se requiere       
          $logo = '<div>'.$Fila['LOGO']==''?'Sin logo agregado':'<img src="../images/imgLogos/'.$Fila['LOGO'].'">'.'</div>';
          
          $botones='<div></div>';
        }
  
        
        $row[] = '<span style="text-aling:center;" class="" title="">'.$Fila['IDLABORATORIOS'].'</span>'; 
        $row[] = '<span class="">'.$nombre_c.'</span>';  
        $row[] = '<span class="contenedor-btn" title="">'.$logo.'</span>';
        $row[] = '<span class="contenedor-btn" title="">'.$botones.'</span>';
  
        $output['aaData'][] = $row;
      }
      
      //var_dump($output);
      return json_encode($output);
}
  
?>