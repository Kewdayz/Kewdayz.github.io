<?php
$to = "mckbnt@gmail.com";  // Replace with your email address
$subject = "Test Email";
$message = "This is a test email.";

$headers = "From: sender@example.com";

if (mail($to, $subject, $message, $headers)) {
  echo "Email sent successfully!";
} else {
  echo "Email sending failed.";
}
?>
