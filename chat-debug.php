<?php
header('Content-Type: application/json');

$apiKey = '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';

// Test 1: curl verfügbar?
if (!function_exists('curl_init')) {
    echo json_encode(['step' => 'curl_not_available']);
    exit;
}

// Test 2: einfachste Groq-Anfrage
$data = [
    'model' => 'llama-3.3-70b-versatile',
    'messages' => [['role' => 'user', 'content' => 'Sag nur: OK']],
    'max_tokens' => 10
];

$ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($data),
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ],
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_SSL_VERIFYPEER => false,
]);

$response  = curl_exec($ch);
$curlError = curl_error($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo json_encode([
    'http_code'  => $httpCode,
    'curl_error' => $curlError ?: 'none',
    'response'   => $response ? substr($response, 0, 500) : 'empty'
]);
