const dotenv = require('dotenv');
const express = require('express');
const path = require('path');


// --------------------------------------------
// Importation des routes
// ----------------------------------------------

const chaussureRoute = require('./src/routes/chaussures.route');
const  {serveSwagger, setupSwagger} = require('./src/middleware/swagger.middleware');

dotenv.config();

const server = express();
server.use(express.json());
server.set('json spaces', 2); // Ajoutez un espace de noms pour les objets JSON

server.use('/api/v1/docs', serveSwagger, setupSwagger);

server.use('/api/v1/chaussures', chaussureRoute);

server.use(express.json()); // Spécifie que la réponse est au format json
server.set('json spaces', 2); // Permet de formatter la réponse pour réspécter l'indendation d'un json

// ----------------------------------------------
// Déclaration des endpoints
// ----------------------------------------------
//server.use('/api/v1', docRoute);
server.use(process.env.CHAUSSURES_ROUTE, chaussureRoute);


// ----------------------------------------------
// Lancement du server sur le port 8081
// ----------------------------------------------
const port = Number(process.env.PORT || 8081);
server.listen(port);

// ----------------------------------------------
// ----------------------------------------------
module.exports = server;
