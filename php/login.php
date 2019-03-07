<?php
include 'db.php';
$email = $_POST["email"];
$password = $_POST["password"];
$results = $c->query("SELECT * FROM admins WHERE email='" . $email . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    if ($row["accepted"] == 0) {
        echo -3;
        return;
    }
    if ($row["password"] != $password) {
        echo -2;
        return;
    }
    session_id("jossstream");
    session_start();
    $_SESSION["jossstream_user_id"] = $row["id"];
    echo 0;
} else {
    echo -1;
}