<?php
session_start();
require_once '../helpers/conn.php';

$_POST['usuario'] = 'oskard';
$_POST['clave'] = 'oskard';

$user = $_POST['usuario'];
$password = $_POST['clave'];
$res = checkAttempts();
if(isset($res['comentario'])){
    return $res;
}
$res = login($user, $password);
    if($res['comentario'] !== 'Exito'){
        if (isset($_SESSION['login_attempts'])) {
            $_SESSION['login_attempts']++;
        } else {
            $_SESSION['login_attempts'] = 1;
        }
    }
    //return $res;

print("<pre>".print_r($res,true)."</pre>");


function login($user, $password){
    //$conn = new Conexion();
    $db = Conexion::Conectar();
    $db->debug = true;
    $res = array();
    $stmt = $db->prepare("SELECT * FROM usuarios WHERE usuario = :usuario LIMIT 1");
    $stmt->bindParam(':usuario', $user);
    $stmt->execute();
    $result = $stmt->fetch();
    if ($result) {
        // validate password
        if (password_verify($password, $result['clave'])) {
            // session variables
            $_SESSION['id'] = $result['id'];
            $_SESSION['usuario'] = $result['usuario'];
            // redirect to dashboard
            header('Location: dashboard.php');
            $res['comentario'] = 'Exito';
            return $res;
        } else {
            // error message
            $res['comentario'] = 'Usuario o clave incorrecta.';
            return $res;
        }
    } else {
        // error message
        $res['comentario'] = 'Usuario o clave incorrecta.';
        return $res;
    }
}

function checkAttempts(){
    // maximum number of login attempts
    $max_attempts = 5;
    // lockout time in minutes
    $lockout_time = 10;

    // check if user is locked out
    if (isset($_SESSION['locked_out']) && $_SESSION['locked_out'] > time()) {
        $res['comentario'] = "You have been locked out for $lockout_time minutes.";
        return $res;
    }
    // check if maximum number of login attempts has been reached
    if (isset($_SESSION['login_attempts']) && $_SESSION['login_attempts'] >= $max_attempts) {
        // lock user out
        $_SESSION['locked_out'] = time() + ($lockout_time * 60);
        $res['comentario'] = "You have been locked out for $lockout_time minutes.";
        return $res;
    }
}

function cleanVarsPost($var){
    $var = trim($var);
    $var = stripslashes($var);
    $var = htmlspecialchars($var);
    return $var;
}

