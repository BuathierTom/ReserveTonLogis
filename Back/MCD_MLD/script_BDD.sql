-- Creation de la base de donnees
CREATE DATABASE reservetonlogis;

CREATE TABLE clients (
    id_client INT PRIMARY KEY, 
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    age INT,
    sexe VARCHAR(10),
    adresse VARCHAR(255),
    ville VARCHAR(255),
    codePostal VARCHAR(10),
    telephone VARCHAR(15),
    email VARCHAR(255) UNIQUE NOT NULL,
    motDePasse VARCHAR(255) NOT NULL
);

INSERT INTO Clients (id_client, nom, prenom, age, sexe, adresse, ville, codePostal, telephone, email, motDePasse) VALUES
(1, 'Smith', 'John', 32, 'Homme', '123 Main Street', 'New York', '10001', '555-123-4567', 'john.smith@example.com', 'motdepasse1'),
(2, 'Johnson', 'Mary', 28, 'Femme', '456 Elm Street', 'Los Angeles', '90002', '555-234-5678', 'mary.johnson@example.com', 'motdepasse2'),
(3,'Brown', 'David', 45, 'Homme', '789 Oak Avenue', 'Chicago', '60603', '555-345-6789', 'david.brown@example.com', 'motdepasse3'),
(4,'Davis', 'Sarah', 37, 'Femme', '101 Pine Road', 'Houston', '77004', '555-456-7890', 'sarah.davis@example.com', 'motdepasse4'),
(5,'Young', 'Jennifer', 31, 'Femme', '707 Spruce Court', 'Boston', '02108', '555-012-3456', 'jennifer.young@example.com', 'motdepasse10');
