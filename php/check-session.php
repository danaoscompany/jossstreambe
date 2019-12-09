<?php
session_id("jossstream");
session_start();
if (isset($_SESSION["jossstream_user_id"]) && $_SESSION["jossstream_user_id"] != "") {
	echo 0;
} else {
	echo -1;
}