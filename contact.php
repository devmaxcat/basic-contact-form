<?php
session_start();


$time_allowed_between_emails = 2;

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

if (empty($_POST["name"]) || empty($_POST["message"]) || empty($_POST["email"])) {
    exit(header("HTTP/1.1 400 Please fill out the entire form"));
}

$email = test_input($_POST["email"]);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit(header("HTTP/1.1 400 Please enter valid email address"));
}




function sendEmail(){
    $to = '************'; // change this to whatever email address you want to use. otherwise I think its self-explanatory why this is obfuscated.
    $msg = wordwrap($_POST['message'], 100);
    $subject = 'Contact Form | ' . $_POST['name'] . ' - ' . $_POST['email'];
    $from = $_POST['email'];
    $accepted = mail($to, $subject, $msg, $from);
    if ($accepted){
        $_SESSION['lastSentEmail'] = time();
        echo http_response_code(200);
    } else {
        echo http_response_code(502);
    }
   
}

$now = time();


if (round(($now - $_SESSION['lastSentEmail']) / 60,2) > $time_allowed_between_emails || !$_SESSION['lastSentEmail']){
    sendEmail();

 } elseif (round(($now - $_SESSION['lastSentEmail']) / 60,2) < $time_allowed_between_emails){
    exit(header("HTTP/1.1 403 Please wait before sending another"));
 }

?>