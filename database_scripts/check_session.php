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
            $search_query = "SELECT DISTINCT `Projects`.`timer` as 'timer' FROM `User`, `Projects` 
                    WHERE `User`.`email` = '" . $_SESSION["user"] . "' AND `User`.`id` = `Projects`.`userid` 
                    AND `Projects`.`path` = '" . $_SESSION["file"] . "'";
            $result = mysql_query($search_query);
            if(!$result) {
                echo "retrieve error: " . mysql_error();
                exit();
            }
            $row = mysql_fetch_array($result);
            echo $result . "#" . $_SESSION["file"] . "#" . $row["timer"] ;
        } else {
            echo $result;
        }
    }
?>