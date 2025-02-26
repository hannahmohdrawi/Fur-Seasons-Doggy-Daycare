<?php

    //echo "PHP file is running!";

    // Enable error reporting
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    // API URL for fetching 10 random dog images
    $url = 'https://api.thedogapi.com/v1/images/search?limit=5';



    // Initialize cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "x-api-key: YOUR_API_KEY"
    ));
    curl_setopt($ch, CURLOPT_URL, $url);

    $result = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode([
            'status' => [
                'code' => '500',
                'name' => 'error',
                'description' => 'Curl error: ' . curl_error($ch)
            ]
        ]);
        curl_close($ch);
        exit;
    }

    curl_close($ch);

    // Decode JSON response
    $decodedResult = json_decode($result, true);

    // Prepare output
    $output = [
        'status' => [
            'code' => "200",
            'name' => "ok",
            'description' => "success",
            'returnedIn' => intval((microtime(true) - $executionStartTime) * 1000) . " ms"
        ],
        'data' => $decodedResult
    ];

    // Set response header and output JSON
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output, JSON_PRETTY_PRINT);

?>