<?php
require_once "../cors.php";
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "Dados inválidos"]);
    exit;
}

$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if (!$email || !$password) {
    echo json_encode(["error" => "Campos obrigatórios"]);
    exit;
}

// aqui você valida no banco...
echo json_encode([
    "success" => true,
    "token" => "fake_token_por_enquanto"
]);
