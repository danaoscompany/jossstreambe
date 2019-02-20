<?php
$fileName = uniqid();
$logoData = $_POST["logo_data"];
file_put_contents("../userdata/imgs/" . $fileName, $logoData);
echo $fileName;