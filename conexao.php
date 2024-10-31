<?php
include 'conexao.php';

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM tarefas");
        $tarefas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tarefas);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $stmt = $pdo->prepare("INSERT INTO tarefas (item, status) VALUES (?, ?)");
        $stmt->execute([$data->item, $data->status]);
        echo json_encode(['message' => 'Tarefa criada com sucesso']);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $stmt = $pdo->prepare("UPDATE tarefas SET item = ?, status = ? WHERE id = ?");
        $stmt->execute([$data->item, $data->status, $data->id]);
        echo json_encode(['message' => 'Tarefa atualizada com sucesso']);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $stmt = $pdo->prepare("DELETE FROM tarefas WHERE id = ?");
        $stmt->execute([$data->id]);
        echo json_encode(['message' => 'Tarefa excluída com sucesso']);
        break;

    default:
        echo json_encode(['message' => 'Método não suportado']);
        break;
}
?>
