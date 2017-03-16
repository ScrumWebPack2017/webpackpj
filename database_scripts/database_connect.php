<?php
//Соединяемся с базой, если удачно, то выбираем таблицу
$server = "localhost";
$username = "root";
$pass = "";
$db_link = mysql_connect($server, $username, $pass);
if(!$db_link) {
    echo "conn error";
    exit();
}
$db_selected = mysql_select_db("WebPackDB", $db_link);
if (!$db_selected) {
    echo "error db";
    exit();
}
?>