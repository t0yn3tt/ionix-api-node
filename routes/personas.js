const express = require('express');

const personaController = require('../controllers/personas');
const authorize = require('../middlewares/authorization');


const router = express.Router();

router.post('/personas',authorize("personas:create"), personaController.create);

//,authorize("personas:read")
router.get('/personas',personaController.get);

module.exports = router;