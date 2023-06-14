const router = require('express').Router();

const {
    getAllChaussures,
    getChaussureById,
    updateChaussures,
    createChaussure,
    deleteChaussures
} = require('../controller/chaussures.controller');

/**
 * @swagger
 * /chaussures:
 *  get:
 *    summary: Récupérer toutes les chaussures.
 *    responses:
 *      200:
 *        description: Succès de la requête avec les chaussures récupérées.
 */
router.get('/', getAllChaussures);

/**
 * @swagger
 * /chaussures/{id}:
 *   get:
 *     summary: Récupérer une chaussure par ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la chaussure à récupérer.
 *     responses:
 *       200:
 *         description: Succès de la requête avec la chaussure récupéré.
 *       404:
 *         description: La chaussure avec l'ID spécifié n'a pas été trouvé.
 */
router.get('/:id', getChaussureById);

/**
 * @swagger
 * /chaussure:
 *   post:
 *     summary: Créer une nouveau CHAUSSURE.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chaussure'
 *     responses:
 *       200:
 *         description: Succès de la requête avec la chaussure créé.
 *       400:
 *         description: Requête incorrecte, vérifiez les données fournies.
 */
router.post('/', createChaussure);

/**
 * @swagger
 * /chaussure/{id}:
 *   put:
 *     summary: Mettre à jour une chaussure.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du film à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chaussure'
 *     responses:
 *       200:
 *         description: Succès de la requête avec la chaussure mis à jour.
 *       400:
 *         description: Requête incorrecte, vérifiez les données fournies.
 *       404:
 *         description: La chaussure avec l'ID spécifié n'a pas été trouvé.
 */
router.put('/:id', updateChaussures);

/**
 * @swagger
 * /chaussures/{id}:
 *   delete:
 *     summary: Supprimer un film.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du film à supprimer.
 *     responses:
 *       200:
 *         description: Succès de la requête avec le film supprimé.
 *       404:
 *         description: Le film avec l'ID spécifié n'a pas été trouvé.
 */
router.delete('/:id', deleteChaussures);

module.exports = router;
