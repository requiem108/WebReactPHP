<?php
//Agregar permiso para los CORS
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

session_start();

$JSONData = file_get_contents("php://input");
$dataObject = json_decode($JSONData);
$action = $dataObject->action;


switch ($action) {
    case 'login':
        require_once '../helpers/conn.php';
        $db = Conexion::Conectar(); 
        $user = $dataObject->usuario;
        $password = $dataObject->password;        
        echo login($user, $password,$db);  
        $db=null;     
    break;
    
    default:
        //defautOption();
    break;
}



/*----------------------------------FUNCTIONS----------------------------------*/


//$res = login($user, $password);
    /**/
    //return $res;

function login($user, $password, $db){
    
    require_once '../helpers/global.php';
  
    $res = array('comentario' => '');   
    $res = _Global_::checkAttempts();

    if($res['comentario'] !== ''){
        return json_encode($res);
    }     
   
    $res = array();
    $stmt = $db->prepare("SELECT * FROM usuarios WHERE usuario = :usuario LIMIT 1");
    $stmt->bindParam(':usuario', $user);   
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);    

    if ($result) {
        // validate password
        if ($password == $result['clave']) {
            // session variables
            $_SESSION['id'] = $result['id_usuario'];
            $_SESSION['usuario'] = $result['usuario'];
            $_SESSION['token'] = _Global_::createWebToken();           
            $res['comentario'] = 'Exito';
            $res['token'] = $_SESSION['token'];

            $res['inactivar_tokens']= _Global_::inactivAllTokens($result['id_usuario'],$db);
            $res['insertar_token'] =_GLobal_::insertToken($result['id_usuario'],$_SESSION['token'],$db);
            //return $res;
        } else {
            // error message
            $res['comentario'] = 'Usuario o clave incorrecta.';
            //return $res;
        }
    } else {
        // error message
        $res['comentario'] = 'Usuario o clave incorrecta.';
        //return $res;
    }

    if($res['comentario'] !== 'Exito'){
        if (isset($_SESSION['login_attempts'])) {
            $_SESSION['login_attempts']++;
        } else {
            $_SESSION['login_attempts'] = 1;
        }
    }

    return json_encode($res);
}

function checkAttempts(){
    // maximum number of login attempts
    $max_attempts = 5;
    // lockout time in minutes
    $lockout_time = 10;

    // check if user is locked out
    if (isset($_SESSION['locked_out']) && $_SESSION['locked_out'] > time()) {
        $res['comentario'] = "Usted ha sido bloqueado por $lockout_time minutos.";
        return $res;
    }
    // check if maximum number of login attempts has been reached
    if (isset($_SESSION['login_attempts']) && $_SESSION['login_attempts'] >= $max_attempts) {
        // lock user out
        $_SESSION['locked_out'] = time() + ($lockout_time * 60);
        $res['comentario'] = "Usted ha sido bloqueado por $lockout_time minutos.";
        return $res;
    }
}

function cleanVarsPost($var){
    $var = trim($var);
    $var = stripslashes($var);
    $var = htmlspecialchars($var);
    return $var;
}

function createWebToken(){
    $token = bin2hex(random_bytes(32));
    return $token;
}

function defaultOption(){
    $res['comentario'] = 'No se ha enviado ninguna opción.';
    return json_encode($res);
}
