<?php

require_once('vendor/autoload.php');

use Firebase\JWT\JWT;

class TokenGenerator {
    public static function generarToken($usuario) {
        $clave_secreta = "admin mas mas TOM"; // Aquí debes reemplazar por tu propia clave secreta
        $tiempo_expiracion = time() + (60 * 60 * 24); // El token expirará en 24 horas
        $datos_token = array(
            "iss" => "MAS", // Emisor del token
            "aud" => "Admin", // Audiencia del token
            "iat" => time(), // Fecha de emisión del token
            "exp" => $tiempo_expiracion, // Fecha de expiración del token
            "usr" => $usuario
        );
        $algorithm = "HS256"; // Algoritmo que se utilizará para firmar el token
        $token = JWT::encode($datos_token, $clave_secreta, $algorithm); // Generar el token
        return $token; // Devolver el token generado
    }
}

/*
$token_generado = TokenGenerator::generarToken('oskard'); // Llamada a la función estática "generarToken" de la clase "TokenGenerator"
echo 'OPCIONB';
echo $token_generado; // Mostrar el token generado en pantalla
*/


?>