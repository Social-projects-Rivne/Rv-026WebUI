import express from 'express';

import tagController from '../controllers/tagController';

const router = express.Router();

router.get('/api/tags/all', tagController.getAllTags);

module.exports = router;