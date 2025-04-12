<?php

// Configuración de la base de datos

$host = 'localhost';
$dbname = '';
$user = '';
$password = '';



try {

    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {

    die("Error de conexión a la base de datos: " . $e->getMessage());

}



if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $originalUrl = filter_var($_POST['originalUrl'], FILTER_VALIDATE_URL);

    $recaptchaToken = $_POST['recaptcha_token'];



    if ($originalUrl) {

        // Verificar el token de reCAPTCHA

        $secretKey = 'OGyl';

        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$recaptchaToken");

        $recaptcha = json_decode($response, true);



        if ($recaptcha['success']) {

            $shortCode = substr(md5(uniqid(rand(), true)), 0, 6);

            $stmt = $pdo->prepare("INSERT INTO urls (short_code, original_url) VALUES (:short_code, :original_url)");

            $stmt->execute(['short_code' => $shortCode, 'original_url' => $originalUrl]);

            $shortUrl = "https://dg21.pro/$shortCode";

            echo json_encode(['success' => true, 'shortUrl' => $shortUrl]);

        } else {

            echo json_encode(['success' => false, 'error' => 'reCAPTCHA fallido.']);

        }

    } else {

        echo json_encode(['success' => false, 'error' => 'URL inválida']);

    }

    exit;

}



if (isset($_GET['code'])) {

    $code = $_GET['code'];

    $stmt = $pdo->prepare("SELECT original_url FROM urls WHERE short_code = :short_code");

    $stmt->execute(['short_code' => $code]);

    $url = $stmt->fetchColumn();



    if ($url) {

        header("Location: $url");

        exit;

    } else {

        echo "URL no encontrada";

    }

}

?>