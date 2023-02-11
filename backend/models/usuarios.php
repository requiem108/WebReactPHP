<?php
//Api usuarios para el proyecto de la web TOM
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

session_start();

require_once '../helpers/global.php';

$JSONData = file_get_contents("php://input");
$dataObject = json_decode($JSONData);
$action = $dataObject->action;


switch ($action) {
    case 'getUsuarios':
        require_once '../helpers/conn.php';
        $db = Conexion::Conectar();                  
        echo getUsuarios($db);  
        $db=null;     
    break;
    
    default:
        //defautOption();
    break;
}


/*----------------------------------FUNCTIONS----------------------------------*/
function getUsuarios($db){
    try
    {
        //Validate Token
        $res = array();
        $res['token_validation'] = _Global_::validateToken($dataObject->token, $dataObject->usuario, $db);

        if ($res['token_validation'] !== 'Token valido') {
            throw new Exception($res['token_validation']);
        }        
       
        $stmt = $db->prepare("SELECT * FROM usuarios");
        $stmt->execute();
        $res['data_usuario'] = $stmt->fetchAll(PDO::FETCH_ASSOC);     
    }
    catch (Exception $e)
    {
       $res['error'] = $e->getMessage();
       $res['data_usuario'] = array();
    }
       
    return json_encode($res);
}