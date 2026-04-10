<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$name        = strip_tags($input['name']        ?? '');
$email       = strip_tags($input['email']       ?? '');
$phone       = strip_tags($input['phone']       ?? '');
$artist      = strip_tags($input['artist']      ?? '');
$position    = strip_tags($input['position']    ?? '');
$groesse     = strip_tags($input['groesse']     ?? '');
$motiv       = strip_tags($input['motiv']       ?? '');
$stildetails = strip_tags($input['stildetails'] ?? '');
$datum       = strip_tags($input['datum']       ?? '');
$chatlog     = strip_tags($input['chatlog']     ?? '');

if (!$name || !$email || !$artist || !$motiv) {
    echo json_encode(['error' => 'Pflichtfelder fehlen']);
    exit;
}

$to      = 'info@7erink.com';
$subject = '=?UTF-8?B?' . base64_encode('Tattoo-Anfrage fuer ' . $artist . ' von ' . $name) . '?=';

$body  = "=== TATTOO-ANFRAGE ===\n\n";
$body .= "Name:          $name\n";
$body .= "Telefon:       $phone\n";
$body .= "E-Mail:        $email\n\n";
$body .= "Artist:        $artist\n";
$body .= "Koerperstelle: $position\n";
$body .= "Groesse:       " . ($groesse ?: 'nicht angegeben') . "\n\n";
$body .= "Motiv & Beschreibung:\n$motiv\n\n";
$body .= "Stil-Details:  " . ($stildetails ?: 'Artist entscheidet') . "\n";
$body .= "Wunschzeitraum: " . ($datum ?: 'flexibel') . "\n";

if ($chatlog) {
    $body .= "\n--- Chat-Verlauf ---\n" . mb_substr($chatlog, 0, 5000) . "\n";
}

$headers  = "From: noreply@7erink.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: base64\r\n";

$sent = mail($to, $subject, base64_encode($body), $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    error_log('[7erink mail] mail() failed for: ' . $name . ' / ' . $email . ' / ' . $motiv);
    // Fallback: in Datei schreiben damit Anfrage nicht verloren geht
    $logEntry = date('Y-m-d H:i:s') . " | $name | $phone | $email | $artist | $motiv\n";
    file_put_contents(__DIR__ . '/anfragen_backup.txt', $logEntry, FILE_APPEND);
    echo json_encode(['error' => 'mail_failed']);
}
