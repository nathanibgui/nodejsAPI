const assert = require('assert');
const sinon = require('sinon');
const chaussureModel = require('../src/models/chaussures.model');
const chaussureController = require('../src/controller/chaussures.controller');

describe('chaussureController', function () {
    describe('getAllChaussures', function () {
        it('should return all chaussure', function () {
            // Données de simulation
            const expectedResult = ['chaussure 1', 'chaussure 2', 'chaussure 3'];
// Remplace la fonction getAllchaussures par une implémentation fictive
            sinon.stub(chaussureModel, 'getAllChaussures').callsFake(function (callback) {
                callback(null, expectedResult);
            });

            const req = {};
            const res = {
                send: function (data) {
                    assert.deepStrictEqual(data, expectedResult);
                    chaussureModel.getAllChaussures.restore(); // Restoring the original function
                },
                status: function (statusCode) {
                    assert.strictEqual(statusCode, 500);
                    return this;
                }
            };

            chaussureController.getAllChaussures(req, res);
        });

        it('should handle error and return status 500', function () {
            const expectedError = new Error('Some error message');

            // Stubbing autheurModel.getAllAutheurs to return the error
            sinon.stub(chaussureModel, 'getAllChaussures').callsFake(function (callback) {
                callback(expectedError, null);
            });

            const req = {};
            const res = {
                send: function (data) {
                    assert.fail('send should not be called');
                },
                status: function (statusCode) {
                    assert.strictEqual(statusCode, 500);
                    return this;
                },
                send: function (data) {
                    assert.deepStrictEqual(data, {
                        message: expectedError.message || 'Une erreur est survenue en essayant de récupérer les chaussures'
                    });
                    // Rétablit la fonction getAllChaussures d'origine

                    chaussureModel.getAllChaussures.restore();
                }
            };

            chaussureController.getAllChaussures(req, res);
        });
    });
});
