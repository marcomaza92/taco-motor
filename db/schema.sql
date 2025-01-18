DROP TABLE IF EXISTS parts;
DROP TABLE IF EXISTS brands;

CREATE TABLE brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brandId INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brandId) REFERENCES brands(id) ON DELETE CASCADE
);

INSERT INTO brands (name) VALUES ('Volkswagen');
INSERT INTO brands (name) VALUES ('Toyota');

INSERT INTO parts (brandId, name, description) VALUES (1, 'Correa', 'Correa premium');
INSERT INTO parts (brandId, name, description) VALUES (1, 'Taco Motor', 'Taco Motor nuevo');
INSERT INTO parts (brandId, name, description) VALUES (2, 'Bujia', 'Bujia cheta');
INSERT INTO parts (brandId, name, description) VALUES (2, 'Taco Motor', 'Taco Motor');