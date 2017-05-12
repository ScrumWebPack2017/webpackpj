<?php
    include 'database_connect.php';
    require ("database_framework.php");
	session_start();

    $date_format = date('Y/m/d');
    $sel_query = "SELECT DISTINCT `date` FROM `WorkTime` WHERE `date` = '" . $date_format . "'";
    $result_sel = mysql_query($sel_query);
    if(!$result_sel) {
        echo "not sent: " . mysql_error();
        exit();
    }

    if(mysql_num_rows($result_sel) == 0) {
        $sel_query_id = "SELECT `id` as 'ide' FROM `User` GROUP BY 'ide'";
        $result_sel_id = mysql_query($sel_query_id);
        if(!$result_sel_id) {
            echo "not sent: " . mysql_error();
            exit();
        }

        while($row = mysql_fetch_array($result_sel_id)) {
            $in_query_id = "INSERT INTO `WorkTime` (`userid`, `date`) VALUES ('" . $row['ide'] . "', '" . $date_format . "')";
            $in_sel_id = mysql_query($in_query_id);
            if(!$in_sel_id) {
                echo "not sent: " . mysql_error();
                exit();
            }
        }
    }

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