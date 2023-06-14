
const chaussureModel = require('../models/chaussures.model');


const getAllChaussures = (req, res) => {
    chaussureModel.getAllChaussures((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Une erreur est survenue en essayant de récupérer les chaussures"
            });
        } else {
            res.send(data);
        }
    });
};

const getChaussureById = (req, res) => {
    const ChaussureId = req.params.id;

    chaussureModel.getChaussuresById(ChaussureId, (error, chaussure) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Une erreur est survenue en essayant de récupérer la chaussure"
            });
        } else {
            if (chaussure.length > 0) {
                res.send(chaussure[0]);
            } else {
                res.status(404).send({
                    message: "Film non trouvé"
                });
            }
        }
    });
};

const updateChaussures = (req, res) => {
    const chaussureId = req.params.id;
    const nouveauChaussure = {
        nom: req.body.nom,
        marque: req.body.marque,
        couleur: req.body.couleur,
        taille: req.body.taille
    };

    chaussureModel.updateChaussures(chaussureId, nouveauChaussure, (error, rowsAffected) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Une erreur est survenue lors de la mise à jour de la chaussure"
            });
        } else {
            if (rowsAffected > 0) {
                res.send({ id: chaussureId, ...nouveauChaussure });
            } else {
                res.status(404).send({
                    message: "Chaussure non trouvé"
                });
            }
        }
    });
};

const createChaussure = (req, res) => {
    const nouveauChaussure = {
        nom: req.body.nom,
        marque: req.body.marque,
        couleur: req.body.couleur,
        taille: req.body.taille
    };

    chaussureModel.createChaussure(nouveauChaussure, (error, chaussureId) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Une erreur est survenue lors de la création des chaussures"
            });
        } else {
            res.send({ id: chaussureId, ...chaussureId });
        }
    });
};

const deleteChaussures = (req, res) => {
    const chaussureId = req.params.id;

    chaussureModel.deleteChaussureById(chaussureId, (error, rowsAffected) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Une erreur est survenue lors de la suppression de la chaussure"
            });
        } else {
            if (rowsAffected > 0) {
                res.send({ message: "Chaussure supprimé avec succès" });
            } else {
                res.status(404).send({
                    message: "Chaussure non trouvé"
                });
            }
        }
    });
};

module.exports = {
    getAllChaussures,
    getChaussureById,
    updateChaussures,
    createChaussure,
    deleteChaussures
};

