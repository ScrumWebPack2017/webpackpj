<?php
    include 'database_connect.php';
    require ("database_framework.php");
	session_start();

	if(isset($_SESSION["user"])){
        if(contains($_SESSION["user"])){
            echo "error with ' symbol";
            exit();
        }
        $found = "SELECT * FROM `User` WHERE `email` = '".$_SESSION["user"]."'";
        $found_data = mysql_query($found);
        if(!$found_data) {
            echo "retrieve error: " . mysql_error();
            exit();
        }
        $result;
        while($row = mysql_fetch_array($found_data)) {
            $result = $row["file"];
        }
        if(isset($_SESSION["file"])) {
            echo $result . "#" . $_SESSION["file"];
        } else {
            echo $result;
        }
    }
?>