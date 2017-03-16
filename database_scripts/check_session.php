<?php
    include 'database_connect.php';
	session_start();

	if(isset($_SESSION["user"])){
        $found = "SELECT * FROM `User` WHERE `email` = '".$_SESSION["user"]."' OR `phone` = '".$_SESSION["user"]."'";
        $fdata = mysql_query($found);
        $result;
        while($row = mysql_fetch_array($fdata)) {
            $result = $row['email'];
        }
        echo $result;
    }
?>