<?php 

	session_start();

	// for debug use $_GET["param"]
	// http://localhost/luolai-h5-20151205/db/addplayer2.php?id=o1zitjlK5QY7rH113wDe2f96ThUtOw
    // $_SESSION['openid']   = 'x2zitjlK5QY7rH113wDe2f96ThUtOw';
    // $_SESSION['img']      = 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBUibh2dXOLU3DkiblnVLNCfOb6D6ViawSD8mtPSFl86lVg59cdSIZ7u40lBLPr3ibvVc1xynrpn2U2UQ/0';
    // $_SESSION['nickname'] = 'max';
    // $player1openid        = $_GET['id'];


	include_once 'connect.php';

	// params
	$player1openid     = $_POST['id'];
	$player2openid     = $_SESSION['openid'];
	$player2headimgurl = $_SESSION['img'];
	$player2nickname   = $_SESSION['nickname'];
	$player2adate      = date("Y-m-d H:i:s",time());

	if ($conn)
	{
		$query = "UPDATE user SET  player2openid = '$player2openid', player2headimgurl = '$player2headimgurl', player2nickname = '$player2nickname', player2adate = '$player2adate' WHERE player1openid = '$player1openid'";
		mysqli_query($conn , $query) or die("Error in query: $query. ".mysql_error());
	}else
	{
		echo 'database is disconnect!';
	}

	mysqli_close($conn);
?>﻿