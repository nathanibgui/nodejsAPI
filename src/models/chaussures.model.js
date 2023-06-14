const dataBase = require('../db/db');

const Chaussures = function(chaussures) {
    this.nom = chaussures.nom;
    this.marque = chaussures.marque;
    this.couleur = chaussures.couleur;
    this.taille = chaussures.taille;
};

Chaussures.getAllChaussures = result => {
    dataBase.query('SELECT * FROM chaussures', (error, response) => {
        if (error) {
            result(error, null);
        } else {
            result(null, response);
        }
    });
};

Chaussures.getChaussuresById = (id, result) => {
    dataBase.query('SELECT * FROM chaussures WHERE id = ?', id, (error, response) => {
        if (error) {
            result(error, null);
        } else {
            result(null, response);
        }
    });
};

Chaussures.createChaussure = (newChaussure, result) => {
    const { nom, marque, couleur, taille } = newChaussure;
    const query = 'INSERT INTO chaussures (nom, marque, couleur, taille) VALUES (?, ?, ?, ?)';
    dataBase.query(query, [nom, marque, couleur, taille], (error, response) => {
        if (error) {
            result(error, null);
        } else {
            result(null, response.insertId);
        }
    });
};

Chaussures.updateChaussures = (id, updatedChaussure, result) => {
    const { nom, marque, couleur, taille } = updatedChaussure;
    const query = 'UPDATE chaussures SET nom = ?, marque = ?, couleur = ?, taille = ? WHERE id = ?';
    dataBase.query(query, [nom, marque, couleur, taille, id], (error, response) => {
        if (error) {
            result(error, null);
        } else {
            result(null, response.affectedRows);
        }
    });
};

Chaussures.deleteChaussureById = (id, result) => {
    dataBase.query('DELETE FROM chaussures WHERE id = ?', id, (error, response) => {
        if (error) {
            result(error, null);
        } else {
            result(null, response.affectedRows);
        }
    });
};

module.exports = Chaussures;


