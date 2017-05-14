<?php
    include "database_connect.php";

    function checkForEmail($email) {
        $search_query = "SELECT id FROM `User` WHERE `email` = '" . $email . "'";
        $result = mysql_query($search_query);
        if(!$result) {
            echo "retrieve error: " . mysql_error();
            exit();
        }
        $row = mysql_fetch_array($result);
        if($row[0] != 0) {
            return true;
        }
        return false;
    }

    function checkForKey($email) {
        if(contains($email)) return false;
        $search_query = "SELECT id FROM `Reset` WHERE `email` = '" . $email . "'";
        $result = mysql_query($search_query);
        if(!$result) {
            echo "retrieve error: " . mysql_error();
            exit();
        }
        $row = mysql_fetch_array($result);
        if($row[0] != 0) {
            return true;
        }
        return false;
    }


function checkEmailFW($email) {
        $pattern = '/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i';
        return (preg_match($pattern, $email));
    }

    function checkPassFW($email) {
        $pattern = '/^[a-z0-9_-]{6,18}$/i';
        return (preg_match($pattern, $email));
    }

    function getKey($email, $key) {
        if(contains($email) || contains($key)) return false;
        $search_query = "SELECT id FROM `Reset` WHERE `email` = '" . $email . "' AND `keyTemp` = '" . $key . "'";
        $result = mysql_query($search_query);
        if(!$result) {
            echo "retrieve error: " . mysql_error();
            exit();
        }
        $row = mysql_fetch_array($result);
        if($row[0] != 0) {
            return true;
        }
        return false;
    }

    function keyGenerator() {
        $answer = "";
        $alphas = array_merge(range('A', 'Z'), range('a', 'z'));
        $nums = range(0, 9);
        $i = rand(10, 15);
        for($j = 0; $j < $i; ++$j) {
            $tmp = rand(0, 1);
            if($tmp == 0) {
                $answer .= $alphas[rand(0, count($alphas) - 1)];
            }
            else {
                $answer .= $nums[rand(0, count($nums) - 1)];
            }
        }
        return $answer;
    }

    function contains($str) {
       if(strpos($str, "'") !== false) return true;
       return false;
    }

    function countFile($file) {
        if ($file) {
            $cnt = 0;
            while (($line = fgets($file)) !== false) {
                ++$cnt;
            }
            rewind($file);
            return $cnt;
        }
        return -1;
    }
?>