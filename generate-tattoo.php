<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['details'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$apiKey = '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';

$details     = $input['details'];
$motiv       = $details['motiv'] ?? '';
$position    = $details['position'] ?? '';
$groesse     = $details['groesse'] ?? '';
$stildetails = $details['stildetails'] ?? '';
$artist      = $details['artist'] ?? '';

$styleDesc = 'black and grey realism tattoo';
if ($artist === 'Patrick') $styleDesc = 'fine line tattoo, minimalist, delicate linework';
if ($artist === 'Mel')     $styleDesc = 'handpoke tattoo, dotwork style, organic texture';

$prompt  = "Professional tattoo design, {$styleDesc}, subject: {$motiv}";
if ($stildetails) $prompt .= ", {$stildetails}";
if ($position)    $prompt .= ", designed for placement on {$position}";
if ($groesse)     $prompt .= ", size reference: {$groesse}";
$prompt .= ". Clean white background, high detail, professional tattoo flash art style, no text, no watermark, centered composition, ready to use as tattoo reference";

$data = [
    'model'   => 'dall-e-3',
    'prompt'  => $prompt,
    'n'       => 1,
    'size'    => '1024x1024',
    'quality' => 'standard',
    'style'   => 'natural'
];

$ch = curl_init('https://api.openai.com/v1/images/generations');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($data),
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ],
    CURLOPT_TIMEOUT        => 60,
    CURLOPT_SSL_VERIFYPEER => false,
]);

$response  = curl_exec($ch);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false || $curlError) {
    error_log('[7erink generate] curl error: ' . $curlError);
    echo json_encode(['error' => 'Verbindungsfehler']);
    exit;
}

$result = json_decode($response, true);

if (isset($result['error'])) {
    error_log('[7erink generate] OpenAI error: ' . json_encode($result['error']));
    echo json_encode(['error' => $result['error']['message'] ?? 'Fehler']);
    exit;
}

$imageUrl = $result['data'][0]['url'] ?? null;
if (!$imageUrl) {
    echo json_encode(['error' => 'Kein Bild erhalten']);
    exit;
}

echo json_encode(['url' => $imageUrl]);
