const mysql = require('mysql');

// Configurer les informations de connexion à votre base de données
const connection = mysql.createConnection({
    host: '127.0.0.1', // L'hôte de votre base de données (par exemple, localhost)
    user: 'root', // L'utilisateur de votre base de données
    password: 'root', // Le mot de passe de votre base de données
    database: 'chaussure' // Le nom de votre base de données
});

// Établir la connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connexion à la base de données réussie');
    }
});

// ----------------------------------------------
// ----------------------------------------------
module.exports = connection;
