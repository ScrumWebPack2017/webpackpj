<?php
    include 'database_connect.php';
	session_start();

	if(isset($_SESSION["user"])){
        $found = "SELECT * FROM `User` WHERE `email` = '".$_SESSION["user"]."'";
        $fdata = mysql_query($found);
        if(!$fdata) {
            echo "retrieve error: " . mysql_error();
            exit();
        }
        $result;
        while($row = mysql_fetch_array($fdata)) {
            $result = $row['email'];
        }
        echo $result;
    }
?>