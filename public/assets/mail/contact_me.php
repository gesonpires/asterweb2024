<?php
// Check for empty fields
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Create the email and send the message
$to = "geson.pires@gmail.com"; // Add your email address in between the "" replacing yourname@yourdomain.com - This is where the form will send a message to.
$subject = "Formulário da webpage ASTER:  $name";
$body = "Você recebeu uma nova mensagem de ASTER webpage.\n\n"."Aqui estão os detalhes:\n\nNome: $name\n\nE-mail: $email\n\Mensagem:\n$message";
$header = "From: noreply@gmail.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$header .= "Reply-To: $email";	

if(!mail($to, $subject, $body, $header))
  http_response_code(500);
?>
