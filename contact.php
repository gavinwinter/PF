<?php
if(isset($_POST['name']) && isset($_POST['email'])){
	$name = $_POST['name']
	$email = $_POST['email'];
	$subject = "Contact Form Submission";
	$to = 'winterg6@gmail.com';
	$body = '<html>
				<body>
					<p>
						$_POST['message'];
					</p>
				</body>
			</html>';
// headers
$headers = "From: ".$name." <".$email.">\r\n";
$headers .= "Reply-To: ".$email."\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset-utf-8";
// send
$send = mail($to, $subject, $body, $headers);
if($send){
	echo '<br>';
	echo 'Thanks for contacting me. I will get back to you shortly.';
}else {
	echo 'error';
}
}
?>
