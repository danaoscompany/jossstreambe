<?php
include 'db.php';
$userId = $_POST["id"];
$name = $_POST["name"];
$username = $_POST["username"];
$phone = $_POST["phone"];
$password = $_POST["password"];
$activeConnections = intval($_POST["active_connections"]);
$maxConnections = intval($_POST["maximum_connections"]);
$confirmed = intval($_POST["confirmed"]);
$city = $_POST["city"];
$endDate = intval($_POST["end_date"]);
$trial = intval($_POST["trial"]);
$profilePictureSet = intval($_POST["profile_picture_set"]);
$profilePictureURL = $_POST["profile_picture_url"];
//$c->query("UPDATE users SET phone='" . $phone . "', password='" . $password . "', confirmed=" . $confirmed . ", name='" . $name . "', username='" . $username . "', profile_picture_url='" . $profilePictureURL . "', city='" . $city . "', end_date=" . $endDate . ", is_trial=" . $trial . ", active_connections=" . $activeConnections . ", maximum_connections=" . $maxConnections . " WHERE id='" . $userId . "'");
$c->query("UPDATE users SET phone='+6281987654321', password='Hello456', confirmed=1, name='User Name', username='username6', profile_picture_url='http://www.google.com', city='Sidoarjo', end_date=1558890000000, is_trial=1, active_connections=10, maximum_connections=20 WHERE id='ajxqNQ5zlZXUL7kjHEzxZ8qnURj2'");
echo 0;