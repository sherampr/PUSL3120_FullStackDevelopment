const express = require('express');
const router = express.Router();
const rusersController = require('../controllers/rusersController');

router.get('/:id', rusersController.rusers)

module.exports = router;

