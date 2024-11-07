<?php
include 'conexao.php';

$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case 'GET':
        $sql = "SELECT * FROM tasks";
        $result = $conn->query($sql);
        $tarefas = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $tarefas[] = $row;
            }
        }
        echo json_encode($tarefas);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $item = $data->item;
        $status = $data->status;

        $stmt = $conn->prepare("INSERT INTO tasks (item, status) VALUES (?, ?)");
        $stmt->bind_param("ss", $item, $status);
        $stmt->execute();

        echo json_encode(['message' => 'Tarefa criada com sucesso']);
        $stmt->close();
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        $item = $data->item;
        $status = $data->status;

        $stmt = $conn->prepare("UPDATE tasks SET item = ?, status = ? WHERE id = ?");
        $stmt->bind_param("ssi", $item, $status, $id);
        $stmt->execute();

        echo json_encode(['message' => 'Tarefa atualizada com sucesso']);
        $stmt->close();
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;

        $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        echo json_encode(['message' => 'Tarefa excluída com sucesso']);
        $stmt->close();
        break;

    default:
        echo json_encode(['message' => 'Método não suportado']);
        break;
}

$conn->close();
?>
