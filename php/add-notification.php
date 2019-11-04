<?php
include 'db.php';
$title = $_POST["title"];
$content = $_POST["content"];
$date = intval($_POST["date"]);
$c->query("INSERT INTO notifications (title, content, date) VALUES ('" . $title . "', '" . $content . "', " . $date . ")");