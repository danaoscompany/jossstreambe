<?php
include 'db.php';
$name = $_GET["name"];
$idName = $_GET["id_name"];
$id = intval($_GET["id"]);
$items = [];
$results = $c->query("SELECT * FROM " . $name . " WHERE " . $idName . "=" . $id);
if ($results && $results->num_rows > 0) {
	while ($row = $results->fetch_assoc()) {
		array_push($items, $row);
	}
}
echo json_encode($items);
