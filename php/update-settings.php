<?php
$settings = $_POST["content"];
file_put_contents("../../iptv/systemdata/settings.json", $settings);