<?php
header('Content-Type: application/json');

$host = '127.0.0.1';
$user = 'root';
$pass = '';
$db   = 'db_spk_kuliner';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Koneksi database gagal']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// post
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['rekomendasi_1'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Data tidak valid']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO riwayat_rekomendasi (bobot_json, tipe_json, rekomendasi_1, skor_ki, top_3_ringkasan) VALUES (?, ?, ?, ?, ?)");
    $bobotJson = json_encode($input['weights']);
    $tipeJson  = json_encode($input['types']);
    $rek1      = $input['rekomendasi_1'];
    $skorKi    = (float) $input['skor_ki'];
    $top3      = $input['top_3_ringkasan'];

    $stmt->bind_param("sssds", $bobotJson, $tipeJson, $rek1, $skorKi, $top3);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Riwayat berhasil disimpan']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan data']);
    }
    $stmt->close();
}

// get
elseif ($method === 'GET') {
    $result = $conn->query("SELECT * FROM riwayat_rekomendasi ORDER BY waktu_simpan DESC LIMIT 30");
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode(['status' => 'success', 'data' => $rows]);
}

// delete
elseif ($method === 'DELETE') {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if ($id > 0) {
        $stmt = $conn->prepare("DELETE FROM riwayat_rekomendasi WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
        echo json_encode(['status' => 'success', 'message' => 'Riwayat dihapus']);
    }
}

$conn->close();
?>