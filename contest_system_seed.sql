-- Drop tables if they exist
DROP TABLE IF EXISTS Participations, Questions, Contests, Users;

-- Users Table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'vip', 'normal') DEFAULT 'normal',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- Contests Table
CREATE TABLE Contests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    startTime DATETIME,
    endTime DATETIME,
    prize VARCHAR(255),
    access ENUM('vip', 'normal') DEFAULT 'normal',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL
);

-- Questions Table
CREATE TABLE Questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT,
    type ENUM('single', 'multi', 'boolean') NOT NULL,
    options JSON,
    correctAnswer JSON,
    ContestId INT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL,
    FOREIGN KEY (ContestId) REFERENCES Contests(id) ON DELETE CASCADE
);

-- Participations Table
CREATE TABLE Participations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    score INT DEFAULT 0,
    answers JSON,
    submitted BOOLEAN DEFAULT FALSE,
    prizeWon VARCHAR(255),
    ContestId INT,
    UserId INT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT NULL,
    FOREIGN KEY (ContestId) REFERENCES Contests(id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Seed Users
INSERT INTO Users (username, password, role) VALUES 
('admin1', '$2a$10$abcdef...', 'admin'),
('vipuser', '$2a$10$abcdef...', 'vip'),
('normaluser', '$2a$10$abcdef...', 'normal');

-- Seed Contests
INSERT INTO Contests (name, description, startTime, endTime, prize, access) VALUES
('VIP Challenge', 'Exclusive VIP contest', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'VIP Gold Prize', 'vip'),
('General Knowledge Quiz', 'Open for all signed-in users', NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY), 'Book Voucher', 'normal');

-- Seed Questions
INSERT INTO Questions (text, type, options, correctAnswer, ContestId) VALUES
('What is 2+2?', 'single', '["1", "2", "3", "4"]', '["4"]', 2),
('Select all prime numbers', 'multi', '["2", "3", "4", "5"]', '["2", "3", "5"]', 2),
('The sky is blue.', 'boolean', '["true", "false"]', '["true"]', 2),
('Which is a VIP-only question?', 'single', '["VIP1", "VIP2", "VIP3", "VIP4"]', '["VIP3"]', 1);
