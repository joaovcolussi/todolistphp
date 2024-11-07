CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    status ENUM('a fazer', 'em progresso', 'concluido') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
