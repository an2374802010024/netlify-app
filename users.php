<?php
// config.php - Kết nối MySQL
$host = 'localhost';
$dbname = 'phonestore';
$username = 'root';
$password = '';

header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Kết nối database thất bại: " . $e->getMessage()]);
    exit;
}

// users.php - Đăng ký, đăng nhập
function registerUser($username, $password) {
    global $pdo;
    $hash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    return $stmt->execute([$username, $hash]);
}

function loginUser($username, $password) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    return ($user && password_verify($password, $user['password'])) ? $user : false;
}

// products.php - Quản lý sản phẩm
function getProducts() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM products");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function addProduct($name, $price, $category, $image, $description) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO products (name, price, category, image, description) VALUES (?, ?, ?, ?, ?)");
    return $stmt->execute([$name, $price, $category, $image, $description]);
}

function deleteProduct($productId) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    return $stmt->execute([$productId]);
}

// orders.php - Xử lý đơn hàng
function placeOrder($userId, $products, $totalPrice) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO orders (user_id, products, total_price) VALUES (?, ?, ?)");
    return $stmt->execute([$userId, json_encode($products), $totalPrice]);
}

// API - Điều hướng request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $input = json_decode(file_get_contents("php://input"), true);
    switch ($input['action']) {
        case 'register':
            echo json_encode(["success" => registerUser($input['username'], $input['password'])]);
            break;
        case 'login':
            $user = loginUser($input['username'], $input['password']);
            echo json_encode($user ? ["success" => true, "user" => $user] : ["success" => false]);
            break;
        case 'addProduct':
            echo json_encode(["success" => addProduct($input['name'], $input['price'], $input['category'], $input['image'], $input['description'])]);
            break;
        case 'deleteProduct':
            echo json_encode(["success" => deleteProduct($input['productId'])]);
            break;
        case 'placeOrder':
            echo json_encode(["success" => placeOrder($input['userId'], $input['products'], $input['totalPrice'])]);
            break;
        case 'getProducts':
            echo json_encode(getProducts());
            break;
    }
}
?>