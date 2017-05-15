<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    if(!$_POST["html"] && !$_POST["css"]) {
        echo "post fail";
        exit();
    }

    $date = date('Y-m-d-H-i-s');

    function dataGo($date)
    {

        $path = "../serverdata/" . $date;
        mkdir($path);
        $html_file = fopen("..\\serverdata\\".$date."\\index.html", 'x+');
        if(!$html_file) return dataGo();
        fwrite($html_file, $_POST["html"]);
        fclose($html_file);

        $css_file = fopen("..\\serverdata\\".$date."\\style.css", 'x+');
        if(!$css_file) return dataGo();
        fwrite($css_file, $_POST["css"]);
        fclose($css_file);

        $stack = array("..\\serverdata\\".$date."\\index.html", "..\\serverdata\\".$date."\\style.css");
        $archive_file_name = "..\\serverdata\\".$date."\\project.zip";
        return create_zip($stack, $archive_file_name);
    }

    if(dataGo($date))
        echo "/serverdata/".$date."/project.zip";
    else
        echo "bad";

?>