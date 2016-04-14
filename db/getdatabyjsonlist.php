<?php 

	// for debug
	// http://localhost/luolai-h5-20151205/db/getrank.php

	session_start();

	include_once 'connect.php';

	if ($conn)
	{
		// insert score
		$query = "select * from user WHERE score != 'NULL' order by score LIMIT 10";
		$rs_query = mysqli_query($conn , $query) or die("Error in query: $query. ".mysql_error());

		if($rs_query->num_rows > 0)
		{

			$data = array();

			while($row = mysqli_fetch_array($rs_query)) {
			    $data[] = $row;
			}

			$json_data = json_encode($data);
		}else
		{
			$json_data = json_encode('[]');
		}

	}else
	{
		$json_data = json_encode('[]');
	}

	echo $json_data;

	mysqli_close($conn);

 ?>