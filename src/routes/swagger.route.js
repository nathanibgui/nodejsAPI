// ----------------------------------------------
// Importation de la lib pour générer le json swagger
// ----------------------------------------------
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// ----------------------------------------------
// Définition de l'architecture de base de la documentation
// ----------------------------------------------
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Ma chaussure d'enfer",
            version: "0.1.0",
            description: "Documentation de mon API Node js",

        },
        servers: [
            {
                url: "http://localhost:8081/api/v1",
            },
        ],
        components: {
            schemas: {
                Chaussure: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                        },
                        nom: {
                            type: "string",
                        },
                        marque: {
                            type: "integer",
                        },
                        couleur: {
                            type: "string" ,
                        },
                        taille: {
                            type: "integer" ,
                        },
                    },
                },
                ChaussureInput: {
                    type: "object",
                    properties: {
                        nom: {
                            type: "string",
                        },
                        marque: {
                            type: "string" ,
                        },
                        couleur: {
                            type: "string" ,
                        },
                        taille: {
                            type: "integer" ,
                        },
                    },
                    required: ["nom", "marque", "couleur","taille"], // Indiquez les propriétés requises
                },
            },
        },
        tags: [
            // Ajoutez les tags ici
            {
                name: "Chaussure",
                description: "Opérations liées aux chaussures"
            },
        ],
    },
    apis: ["./routes/*.js"],
};


// ----------------------------------------------
// Permet de trier dans la documentation par type de requette HTTP
// ----------------------------------------------
const specs = swaggerJsdoc(options);

const serveSwagger = swaggerUi.serve;
const setupSwagger = swaggerUi.setup(specs);

module.exports = { serveSwagger,setupSwagger};
