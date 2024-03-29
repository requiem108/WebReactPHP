<?php


class _Global_
{
    //variable global que tiene una url
    public static $url_models = 'http://localhost/TOM-A/backend/models/';

    //function to create a web token
    public static function createWebToken($usuario){
        //$token = bin2hex(random_bytes(32));
        /*require_once('../libs/JWT/jwtload.php');
        $token = TokenGenerator::generarToken($usuario); // Llamada a la función estática "generarToken" de la clase "TokenGenerator"
        return $token;*/
        $caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $cadenaAleatoria = '';
        $max = strlen($caracteres) - 1;
        
        for ($i = 0; $i < 20; $i++) {
            $cadenaAleatoria .= $caracteres[rand(0, $max)];
        }

        $fechaActual = date('Y-m-d H:i:s');
        $cadenaConFecha = $cadenaAleatoria . $fechaActual;

        return $cadenaConFecha;
    }

    //function to check the number of login attempts
    public static function checkAttempts(){
        $res = array();
        $res['comentario'] = '';
        if (isset($_SESSION['login_attempts'])) {
            if ($_SESSION['login_attempts'] >= 5) {
                $res['comentario'] = 'Demasiados intentos de inicio de sesion. Por favor, intentelo de nuevo mas tarde.';                
            }
        }
        return $res;
    }

    public static function insertToken($id_usuario,$token,$db){
        $res = array();             
        $stmt = $db->prepare("INSERT INTO token_usuarios (
            token,
            id_usuario_fk,
            fecha_creacion,
            estado
            )VALUES (
                :token,
                :id_usuario,
                CURRENT_TIMESTAMP,
                'A')            
            ");
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':token', $token);
        
        $ok = $stmt->execute();
        if ($ok) {
            return 'Token creado';
           
        } else {
            return 'Error al crear token';
        }        
    }

    //function validate token 2 days
    public static function validateToken($token,$usuario,$db){
        $res = '';
        
        //$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            $stmt = $db->prepare("SELECT * FROM Token_Usuarios 
            WHERE token = :token                 
                AND estado = 'A' 
                AND fecha_creacion >= DATE_SUB(NOW(), INTERVAL 2 DAY) LIMIT 1");            
            $stmt->bindParam(':token', $token);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($result) {
                $res = 'Token valido';
                //$res = 'Token invalido';
                return $res;
            } else {
                $res = 'Token invalido';
                
                $stmt = $db->prepare("UPDATE Token_Usuarios SET estado = 'I' WHERE id_token = :id_token");
                $stmt->bindParam(':id_token', $token);
                $ok = $stmt->execute();
                if ($ok) {
                    $res = 'Token invalido';
                  
                } else {
                    $res = 'Error no actualizo tokens';                    
                }                
            }
            return $res;
        } catch (Exception $th) {
            return  'Token invalido';
        }
        
        
    } 

    private static function changeStateToken($id_token,$db){
        $res = array();
        $stmt = $db->prepare("UPDATE Token_Usuario SET estado = 'I' WHERE id_token = :id_token");
        $stmt->bindParam(':id_token', $id_token);
        $ok = $stmt->execute();
        if ($ok) {
            $res['comentario'] = 'Exito';
            return $res;
        } else {
            $res['comentario'] = 'Error';
            return $res;
        }
    } 

    //function inactive all tokens of a user
    public static function inactivAllTokens($id_usuario,$db){
        
        $res = array();
        $stmt = $db->prepare("UPDATE token_usuarios SET estado = 'I' WHERE id_usuario_fk = :id_usuario");
        $stmt->bindParam(':id_usuario', $id_usuario);
        $ok = $stmt->execute();  
        if ($ok) {
            return 'Tokens inactivados';           
        } else {
            return 'Error al inactivar tokens no se encontro ninguno';
        }     
    }

    public static function limpiaId($Cadena,$Llave){
        return substr($Cadena,(strrpos($Cadena,$Llave)+1));
    }

    //funcion para subir imagenes al servidor recibe la variable $_FILES y la ruta donde se guardara
    public static function uploadImage($file, $ruta, $nombre) {
        $res = array();
        $nombreCompleto = $nombre . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
        $rutaCompleta = $ruta . $nombreCompleto;
        $res['success'] = false;
        
        // Verificar si el archivo es una imagen
        $mime = mime_content_type($file['tmp_name']);
        if (strpos($mime, 'image/') !== 0) {
            $res['error'] = 'El archivo no es una imagen válida';
            return $res;
        }
        
        // Verificar si el archivo existe y borrarlo
        if (file_exists($rutaCompleta)) {
            unlink($rutaCompleta);
        }
        
        // Verificar el tamaño del archivo
        if ($file['size'] > 5 * 1024 * 1024) {
            $res['error'] = 'El archivo es demasiado grande (máximo 5 MB)';
            return $res;
        }
        
        // Mover el archivo a la ruta especificada
        if (!move_uploaded_file($file['tmp_name'], $rutaCompleta)) {
            $res['error'] = 'No se pudo mover el archivo al servidor';
            return $res;
        }
        
        $res['success'] = true;
        $res['ruta'] = $rutaCompleta;
        $res['nombre'] = $nombreCompleto;
        return $res;
    }
}

?>