<?php
include 'db.php';
$name = $_GET["name"];
$id = intval($_GET["id"]);
$items = [];
$sql = "SELECT * FROM " . $name . " WHERE id=" . $id;
$results = $c->query($sql);
while ($row = $results->fetch_assoc()) {
	array_push($items, $row);
}
echo json_encode($items);
