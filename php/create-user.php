<?php
include 'db.php';
$name = $_POST["name"];
$username = $_POST["username"];
$phone = $_POST["phone"];
$password = $_POST["password"];
$maxConnections = intval($_POST["maximum_connections"]);
$activeConnections = intval($_POST["active_connections"]);
$confirmed = intval($_POST["confirmed"]);
$city = $_POST["city"];
$endDate = intval($_POST["end_date"]);
$trial = intval($_POST["trial"]);
$profilePictureSet = intval($_POST["profile_picture_set"]);
$profilePictureURL = $_POST["profile_picture_url"];
$results = $c->query("SELECT * FROM users WHERE username='" . $username . "'");
if ($results && $results->num_rows > 0) {
    echo -1;
    return;
}
$results = $c->query("SELECT * FROM users WHERE phone='" . $phone . "'");
if ($results && $results->num_rows > 0) {
    echo -2;
    return;
}
$c->query("INSERT INTO users (id, phone, password, confirmed, name, profile_picture_url, active_connections, username, city, end_date, is_trial, maximum_connections, made_in) VALUES ('" . uniqid() . "', '" . $phone . "', '" . $password . "', " . $confirmed . ", '" . $name . "', '" . $profilePictureURL . "', " . $activeConnections . ", '" . $username . "', '" . $city . "', " . $endDate . ", " . $trial . ", " . $maxConnections . ", " . round(microtime(true)*1000) . ")");
echo 0;