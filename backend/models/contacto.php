<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../libs/PHPMailer-5.2.27/PHPMailerAutoload.php'; // Asegúrese de instalar PHPMailer usando composer (composer require phpmailer/phpmailer)

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$data = $_POST;

if (!empty($data['nombre']) && !empty($data['email']) && !empty($data['telefono']) && !empty($data['mensaje'])) {
    // Verificar CAPTCHA
    /*
    $recaptcha_secret = "Your server secret key";
    $recaptcha_response = $data['recaptcha_response'];
    $recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}";
    $verify_response = file_get_contents($recaptcha_url);
    $verify_data = json_decode($verify_response);

    if (!$verify_data->success) {
        echo json_encode(['comentario' => 'Captcha incorrecto','ERROR' => 'ERROR']);
        exit;
    }*/

    $nombre = strip_tags($data['nombre']);
    $email = strip_tags($data['email']);
    $telefono = strip_tags($data['telefono']);
    $mensaje = strip_tags($data['mensaje']);

    // Enviar correo
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com'; // Reemplazar con el host de su proveedor de correo
        $mail->SMTPAuth = true;
        $mail->Username = 'your@email.com'; // Reemplazar con su dirección de correo electrónico
        $mail->Password = 'your_email_password'; // Reemplazar con la contraseña de su correo electrónico
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom($email, $nombre);
        $mail->addAddress('recipient@example.com'); // Reemplazar con la dirección de correo electrónico del destinatario

        $mail->isHTML(true);
        $mail->Subject = 'Contacto desde la web';
        $mail->Body = "<h2 style='color: #3884c2;'>Contacto desde la web</h2>
        <p><b>Nombre:</b> {$nombre}</p>
        <p><b>Email:</b> {$email}</p>
        <p><b>Teléfono:</b> {$telefono}</p>
        <p><b>Mensaje:</b></p>
        <p>{$mensaje}</p>";

        $mail->send();
        echo json_encode(['comentario'=>'Correo enviado con exito en breve nos comunicaremos', 'ERROR' => '']);
    } catch (Exception $e) {
        echo json_encode(['comentario' => 'Error al enviar el correo: ' . $mail->ErrorInfo, 'ERROR' => 'ERROR']);
    }
} else {
    echo json_encode(['comentario' => 'Faltan datos por completar','ERROR' => 'ERROR']);
}
?>
