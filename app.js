

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); // npm install swagger-ui-express
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();  // On charge les variables d'environnement


const app = express();


// Définissez les options de configuration Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentation de l\'API Chaussures',
            version: '1.0.0',
            description: 'Documentation de l\'API pour gérer les chaussures',
        },
        basePath: '/api',
    },
    apis: ['/src/routes/app.js'], // Remplacez par le chemin vers votre fichier de définition des routes
};

// Générez la documentation Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions); // npm install swagger-jsdoc

// Ajoutez la documentation Swagger en tant que middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // npm install swagger-ui-express


// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

app.get('/chaussures', (req, res) => {
    const query = 'SELECT * FROM chaussures';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SELECT :', err);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des chaussures' });
        } else {
            res.json(results);
        }
    });
});

// Endpoint GET /chaussures/:id pour récupérer une chaussure spécifique par son ID
app.get('/chaussures/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM chaussures WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SELECT :', err);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de la chaussure' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Chaussure non trouvée' });
            } else {
                res.json(results[0]);
            }
        }
    });
});

// Endpoint POST /chaussures pour ajouter une nouvelle chaussure
app.post('/chaussures', (req, res) => {
    const { nom, marque, couleur, taille } = req.body;
    const query = 'INSERT INTO chaussures (nom, marque, couleur, taille) VALUES (?, ?, ?, ?)';

    connection.query(query, [nom, marque, couleur, taille], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête INSERT :', err);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout de la chaussure' });
        } else {
            res.json({ message: 'Chaussure ajoutée avec succès' });
        }
    });
});

// Endpoint PUT /chaussures/:id pour mettre à jour une chaussure existante par son ID
app.put('/chaussures/:id', (req, res) => {
    const id = req.params.id;
    const { nom, marque, couleur, taille } = req.body;
    const query = 'UPDATE chaussures SET nom = ?, marque = ?, couleur = ?, taille = ? WHERE id = ?';

    connection.query(query, [nom, marque, couleur, taille, id], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête UPDATE :', err);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour de la chaussure' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Chaussure non trouvée' });
            } else {
                res.json({ message: 'Chaussure mise à jour avec succès' });
            }
        }
    });
});

// Endpoint DELETE /chaussures/:id pour supprimer une chaussure par son ID
app.delete('/chaussures/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM chaussures WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête DELETE :', err);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de la chaussure' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Chaussure non trouvée' });
            } else {
                res.json({ message: 'Chaussure supprimée avec succès' });
            }
        }
    });
});

// Démarrer le serveur et écouter les requêtes sur le port spécifié
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
