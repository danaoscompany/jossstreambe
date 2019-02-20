<?php
$channelData = $_POST["channel_data"];
file_put_contents("../../iptv/channels.m3u", $channelData);