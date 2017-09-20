
import { expect } from 'chai';
import { describe, it } from 'mocha';
import proxyquire from 'proxyquire';
import { getRecipeById } from '../controllers/recipeController';

const dbDataRecipes = {
    positiveResponse: [
        {
            id: 20,
            photo: 'https://i12.fotocdn.net/s9/30/public_pin_m/242/2268393757.jpg',
            title: 'Хліб з майонезом',
            description: 'Порізати хліб, намазати на хліб майонез.',
            rating: 5,
            name: 'Хліб',
        },
        {
            id: 20,
            photo: 'https://i12.fotocdn.net/s9/30/public_pin_m/242/2268393757.jpg',
            title: 'Хліб з майонезом',
            description: 'Порізати хліб, намазати на хліб майонез.',
            rating: 5,
            name: 'Майонез',
        },
    ],
    blankResponse: [],
    errorResponse: new Error(),
};

const dbDataTags = {
    positiveResponse: [{ id: 3, name: 'Холодне' }, { id: 6, name: 'Швидко готувати' }],
    blankResponse: [],
    errorReponse: new Error(),
};

const json = function json(x) { this.data = x; };
const getQuery = arr => (text, cb) => {
    cb(null, { rows: arr.shift() });
};
const res = { json, data: null };

describe('getRecipeById testing', () => {
    it('should fail if no id in request', () => {
        const req = { params: { id: '' } };

        getRecipeById(req, res);
        expect(res.data).to.equal('Wrong id');
    });

    it('should fail if id is not numeric string', () => {
        const req = { params: { id: 'q' } };

        getRecipeById(req, res);
        expect(res.data).to.equal('Wrong id');
    });

    it('should fail if id is =0', () => {
        const req = { params: { id: '0' } };

        getRecipeById(req, res);
        expect(res.data).to.equal('Wrong id');
    });

    it('should fail if id is <0', () => {
        const req = { params: { id: '-20' } };

        getRecipeById(req, res);
        expect(res.data).to.equal('Wrong id');
    });

    it('should fail if response is blank array []', () => {
        const req = { params: { id: '99' } };

        const { getRecipeById: proxiedGetRecipeById } = proxyquire(
            '../controllers/recipeController', {
                '../db': {
                    query: (txt, cb) => {
                        cb(null, { rows: dbDataRecipes.blankResponse });
                    },
                },
            },
        );
        proxiedGetRecipeById(req, res);
        expect(res.data).to.equal('No such id in db');
    });

    it('should fail if db returns error', (done) => {
        const req = { params: { id: '20' } };

        const { getRecipeById: proxiedGetRecipeById } = proxyquire(
            '../controllers/recipeController', {
                '../db': {
                    query: (txt, cb) => {
                        cb(dbDataRecipes.errorResponse, { rows: dbDataRecipes.blankResponse });
                    },
                },
            },
        );
        proxiedGetRecipeById(req, res);
        setTimeout(() => {
            expect(res.data).to.equal('Error');
            done();
        }, 100);
    });

    it('should pass if id and response are valid', (done) => {
        const req = { params: { id: '20' } };
        const query = getQuery([
            dbDataRecipes.positiveResponse,
            dbDataTags.positiveResponse,
        ]);

        const { getRecipeById: proxiedGetRecipeById } = proxyquire(
            '../controllers/recipeController', {
                '../db': { query },
            },
        );

        proxiedGetRecipeById(req, res);
        setTimeout(() => {
            expect(res.data).to.have.all.keys(['id', 'title', 'description', 'rating', 'photo', 'ingredients', 'tags']);
            done();
        }, 100);
    });
});
