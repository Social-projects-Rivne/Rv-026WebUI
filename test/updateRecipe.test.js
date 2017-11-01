
import { expect } from 'chai';
import { describe, it } from 'mocha';
import proxyquire from 'proxyquire';
import { updateRecipe } from '../controllers/recipeController';

const serverRequests = {
    positiveRequest: {
        id: 20,
        fieldName: 'title',
        value: 'Spinosa',
    },
    noFieldNameRequest: {
        id: 20,
        fieldName: null,
        value: 'Camus',
    },
    noValueRequest: {
        id: 20,
        fieldName: 'fullname',
        value: null,
    },
};

const dbIngredientsData = {
    positiveRequest: {
            id: 20,
            fieldName: "ingredients",
            deleteValue: [],
            addValue: [],
    },
    negativeRequest: [
        {
            id:20,
            fieldName: "",
            deleteValue: [],
            addValue: [ {id: '', name: 'new'}],
        },
    ],
    blankResponse: [],
    errorResponse: new Error(),
};

const sendStatus = function sendStatus(x) { this.status = x; };
const res = { sendStatus, status: null };

describe('updateRecipe testing', () => {

    it('should fail if field name is null', () => {
        const req = { body: serverRequests.noFieldNameRequest };
        updateRecipe(req, res);
        expect(res.status).to.equal(404);
    });

    it('should fail if field value is null', () => {
        const req = { body: serverRequests.noValueRequest };
        updateRecipe(req, res);
        expect(res.status).to.equal(404);
    });

    it('should fail if field name of ingredient is null', () => {
        const req = { body: dbIngredientsData.negativeRequest };
        updateRecipe(req, res);
        expect(res.status).to.equal(404);
    });

    it('should pass on correct data and correct DB operation', (done) => {
        const req = { body: serverRequests.positiveRequest };
        const { updateRecipe: proxiedUpdateRecipe } = proxyquire(
            '../controllers/recipeController', {
                '../db': {
                    query: (txt, cb) => {
                        cb(null, { rows: serverRequests.positiveRequest });
                    },
                },
            },
        );
        proxiedUpdateRecipe(req, res);

        setTimeout(() => {
            expect(res.status).to.equal(200);
            done();
        }, 100);
    });

    it('should pass on correct data and correct DB operation for ingredient', (done) => {
        const req = { body: dbIngredientsData.positiveRequest };

        const { updateRecipe: proxiedUpdateRecipe } = proxyquire(
            '../controllers/recipeController', {
                '../db': {
                    query: (txt, cb) => {
                        cb(null, { rows: dbIngredientsData.positiveRequest });
                    },
                },
            },
        );
        proxiedUpdateRecipe(req, res);

        setTimeout(() => {
            expect(res.status).to.equal(200);
            done();
        }, 100);
    });

});
