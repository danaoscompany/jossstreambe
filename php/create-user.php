<?php
include 'db.php';
$name = $_POST["name"];
$username = $_POST["username"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$password = $_POST["password"];
$maxConnections = intval($_POST["maximum_connections"]);
$activeConnections = $_POST["active_connections"];
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
if ($email != "") {
    $results = $c->query("SELECT * FROM users WHERE email='" . $email . "'");
    if ($results && $results->num_rows > 0) {
        echo -3;
        return;
    }
}
$c->query("INSERT INTO users (id, email, phone, password, confirmed, name, profile_picture_url, active_connections, username, city, end_date, is_trial, maximum_connections, made_in) VALUES ('" . uniqid() . "', '" . $email . "', '" . $phone . "', '" . $password . "', " . $confirmed . ", '" . $name . "', '" . $profilePictureURL . "', '" . $activeConnections . "', '" . $username . "', '" . $city . "', " . $endDate . ", " . $trial . ", " . $maxConnections . ", " . round(microtime(true)*1000) . ")");
echo 0;