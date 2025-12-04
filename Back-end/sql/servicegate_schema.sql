/**
 * ServiceGate - Estrutura Inicial do Banco de Dados
 * -------------------------------------------------
 * Este arquivo contém o schema base utilizado pelo backend da
 * plataforma ServiceGate.
 *
 * Responsáveis:
 * - Guilherme Nantes (Desenvolvimento Backend)
 * - Eliel Murbahr (QA - Garantia de Qualidade)
 * - Robert Fernandes (Modelagem)
 *
 * Observações:
 * - Esse script NÃO deve conter dados sensíveis.
 * - Use em ambiente de desenvolvimento ou implantação inicial.
 */

-- Criar banco (se não existir)
CREATE DATABASE IF NOT EXISTS service_gate
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE service_gate;

CREATE TABLE plataforma_admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: empresas
CREATE TABLE IF NOT EXISTS empresas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(180) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  telefone VARCHAR(30),
  endereco VARCHAR(255),
  ativo TINYINT(1) DEFAULT 1,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: serviços (cada serviço pertence a uma empresa)
CREATE TABLE IF NOT EXISTS servicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  empresa_id INT NOT NULL,
  nome VARCHAR(180) NOT NULL,
  descricao TEXT,
  valor DECIMAL(10,2) DEFAULT 0.00,
  duracao_minutos INT NOT NULL DEFAULT 30,
  ativo TINYINT(1) DEFAULT 1,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

-- Tabela: agendamentos (sem clientes)
CREATE TABLE IF NOT EXISTS agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  servico_id INT NOT NULL,
  empresa_id INT NOT NULL,
  data_hora DATETIME NOT NULL,
  status ENUM('Agendado','Cancelado','Concluído') DEFAULT 'Agendado',
  observacao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE,
  INDEX idx_empresa_data (empresa_id, data_hora)
);

INSERT INTO plataforma_admins (nome, email, senha)
VALUES 
('Administrador Teste', 'admin@teste.com', '$2b$10$Cw9Wq5JZf4xP9gO8aN4T6OXVyhi0SKxF7hF5ZWSr1L6MjYSY4OwFi');

INSERT INTO empresas (nome, email, senha, telefone, endereco)
VALUES
('Empresa Teste', 'empresa@teste.com', '$2b$10$Cw9Wq5JZf4xP9gO8aN4T6OXVyhi0SKxF7hF5ZWSr1L6MjYSY4OwFi', 
 '11999999999', 'Rua Teste');
