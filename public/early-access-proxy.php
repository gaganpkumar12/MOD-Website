<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(200);
    echo json_encode(array(
        'message' => 'Early access proxy is running',
        'domain' => 'househelp.cleanfanatics.in'
    ));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array('message' => 'Method not allowed'));
    exit();
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || empty($data['name']) || empty($data['phone'])) {
    http_response_code(400);
    echo json_encode(array('message' => 'Name and phone are required'));
    exit();
}

$configPath = __DIR__ . '/early-access-config.php';
if (is_file($configPath)) {
    require_once $configPath;
}

function resolveWebhookUrl() {
    if (defined('EARLY_ACCESS_WEBHOOK_URL') && EARLY_ACCESS_WEBHOOK_URL !== '') {
        return trim(EARLY_ACCESS_WEBHOOK_URL);
    }

    $value = getenv('EARLY_ACCESS_WEBHOOK_URL');
    if ($value) {
        return trim($value);
    }

    if (!empty($_ENV['EARLY_ACCESS_WEBHOOK_URL'])) {
        return trim($_ENV['EARLY_ACCESS_WEBHOOK_URL']);
    }

    if (!empty($_SERVER['EARLY_ACCESS_WEBHOOK_URL'])) {
        return trim($_SERVER['EARLY_ACCESS_WEBHOOK_URL']);
    }

    $envPaths = array(
        __DIR__ . '/.env',
        dirname(__DIR__) . '/.env',
    );

    foreach ($envPaths as $envPath) {
        if (!is_file($envPath) || !is_readable($envPath)) {
            continue;
        }

        $envData = @parse_ini_file($envPath, false, INI_SCANNER_RAW);
        if ($envData && !empty($envData['EARLY_ACCESS_WEBHOOK_URL'])) {
            return trim($envData['EARLY_ACCESS_WEBHOOK_URL']);
        }
    }

    return '';
}

$webhookUrl = resolveWebhookUrl();

if (!$webhookUrl) {
    http_response_code(500);
    echo json_encode(array(
        'message' => 'Webhook is not configured on the server',
        'hint' => 'Set EARLY_ACCESS_WEBHOOK_URL in public/early-access-config.php or server env'
    ));
    exit();
}

$ch = curl_init($webhookUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 20);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(502);
    echo json_encode(array('message' => 'Proxy request failed', 'details' => $curlError));
    exit();
}

if ($httpCode < 200 || $httpCode >= 300) {
    http_response_code(502);
    echo json_encode(array(
        'message' => 'Webhook request failed',
        'status' => $httpCode,
        'details' => substr((string)$response, 0, 300)
    ));
    exit();
}

http_response_code(200);
echo json_encode(array('message' => 'Request submitted successfully'));
