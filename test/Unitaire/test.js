//const assert = require('assert');
const chaussureModel = require('../../src/models/chaussures.model');

describe('Chaussure', () => {
    describe('#createChaussure', () => {
        it('should create a new chaussure', () => {
            const nouveauChaussure = {
                nom: 'Nom de la chaussure',
                marque: 'Nom du réalisateur',
                couleu: 'Rouge',
                taille: 43
            };

            chaussureModel.createChaussure(nouveauChaussure, (error, chaussureId) => {
                assert.strictEqual(error, null);
                assert.strictEqual(typeof chaussureId, 'number');
            });
        });
    });

    describe('#getChaussureById', () => {
        it('should get a chaussure by ID', () => {
            const chaussureId = 1;

            chaussureModel.getChaussureById(chaussureId, (error, chaussure) => {
                assert.strictEqual(error, null);
                assert.strictEqual(chaussure.length, 1);
                assert.strictEqual(chaussure[0].id, chaussureId);
            });
        });
    });

    describe('#updateChaussure', () => {
        it('should update an existing chaussure', () => {
            const chaussureId = 1;
            const updatedChaussure = {
                nom: 'Nom de la chaussure',
                marque: 'Nom du réalisateur',
                couleu: 'Rouge',
                taille: 43
            };

            chaussureModel.updateChaussures(chaussureId, updatedChaussure, (error, rowsAffected) => {
                assert.strictEqual(error, null);
                assert.strictEqual(rowsAffected, 1);
            });
        });
    });

    describe('#deleteChaussure', () => {
        it('should delete an existing chaussure', () => {
            const chaussureId = 1;

            chaussureModel.deleteChaussures(chaussureId, (error, rowsAffected) => {
                assert.strictEqual(error, null);
                assert.strictEqual(rowsAffected, 1);
            });
        });
    });
});
