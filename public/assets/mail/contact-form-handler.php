<?php
	$name = $_POST['name'];
	$visitor_email = $_POST['email'];
	$message = $_POST['message'];
	
	//$email_from = 'geson@gmail.com';
	$email_subject = "Teste de envio 08MAI";
	$email_body = "Nome do usuário: $name.\n".
					"Email do usuário: $visitor_email.\n".
						"Mensagem do usuário: $message.\n";
						
	$to = "geson.pires@gmail.com";
	$headers = "De: $email_from \r\n";
	$headers.="Resposta para: $visitor_email \r\n";
	mail($to,$email_subject,$email_body,$headers);
	header("Location: index.html");
?>