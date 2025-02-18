<?php

    //USES COUNTRYCODE2

    ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$countryCode = isset($_GET['countryCode']) ? $_GET['countryCode'] : null;

	if (!$countryCode) {
		echo json_encode(['status' => ['code' => '400', 'name' => 'error', 'description' => 'Country code not provided']]);
		exit;
	}

    $url = 'http://api.geonames.org/searchJSON?country=' . $countryCode . '&featureClass=P&maxRows=20&username=hannahmohdrawi&type=json';
	
    
	
    
    $ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, $url);
	$result = curl_exec($ch);
	if (curl_errno($ch)) {
		echo json_encode(['status' => ['code' => '500', 'name' => 'error', 'description' => 'Curl error: ' . curl_error($ch)]]);
		exit;
	}
	curl_close($ch);

	$cities = json_decode($result, true);

	if ($cities === null) {
		echo json_encode(['status' => ['code' => '500', 'name' => 'error', 'description' => 'Failed to decode JSON response', 'response' => $result]]);
		exit;
	}

	$city_list = [];
	if (isset($cities['geonames']) && is_array($cities['geonames'])) {
		foreach ($cities['geonames'] as $entry) {
			$city_list[] = [
				'name' => $entry['name'] ?? 'Unknown City',
				'iso_a2' => $entry['countryCode'] ?? 'Unknown Code',
				'country' => $entry['adminName1'] ?? 'Unknown Country',
				'latitude' => isset($entry['lat']) ? (float) $entry['lat'] : null,
				'longitude' => isset($entry['lng']) ? (float) $entry['lng'] : null,
				'country' => $entry['adminName1'] ?? 'Unknown Code',
			];
		}
	}

	$output = [
		'status' => [
			'code' => "200",
			'name' => "ok",
			'description' => "success",
			'returnedIn' => intval((microtime(true) - $executionStartTime) * 1000) . " ms"
		],
		'data' => $city_list
	];

	header('Content-Type: application/json; charset=UTF-8');
	echo json_encode($output);
?>
