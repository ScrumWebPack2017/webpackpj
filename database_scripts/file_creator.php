<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    if(!$_POST["data"] && !$_SESSION["user"]) {
        echo "post fail";
        exit();
    }

    $email = $_SESSION["user"];
    $select_query = "SELECT `Projects`.`id` FROM `Projects`, `User` WHERE `User`.`id` = `Projects`.`userid` 
        AND `User`.`email` = '" . $_SESSION["user"] . "' AND `Projects`.`name` = '" . $_POST["data"] . "'";
    $select_insert = mysql_query($select_query);
    if(!$select_insert) {
        echo "not sent: " . mysql_error();
        exit();
    }
    $found = mysql_num_rows($select_insert);
    $date = date('Y/m/d H:i:s');
    $namer = $_POST["data"];
    if(!preg_match("/[A-Za-z0-9]{1,}/", $namer, $matches, PREG_OFFSET_CAPTURE)) {
        $namer = str_replace('С?','fgr43443443', $namer);
        $namer = mb_convert_encoding($namer, "windows-1251", "utf-8");
        $namer = str_replace('fgr43443443','ш',$namer);
    }
    $pathLocale;
    if($found > 0) {
        $path = $_POST["data"] . "(" . $found . ").webml";
        $pathLocale = $namer . "(" . $found . ").webml";
    } else {
        $path = $_POST["data"] . ".webml";
        $pathLocale = $namer . ".webml";
    }
    $file = fopen("..\\userprojects\\" . $_SESSION["user"] . "\\" . $pathLocale, "w+");

    $insert_query = "INSERT INTO `Projects` (`userid`, `name`, `path`, `timer`, `image`)
               SELECT DISTINCT `id`, '" . $_POST["data"] . "', '" . $path . "', '" . $date . "', 'images/1234.png' FROM `User` WHERE `email` = '" . $email . "'";
    $result_insert = mysql_query($insert_query);
    if(!$result_insert) {
        echo "not sent: " . mysql_error();
        exit();
    }
    fclose($file);
    echo $path . "=" . $date;
?>