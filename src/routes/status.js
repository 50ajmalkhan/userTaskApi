const express = require('express');
const router = express.Router();
const { addStatus } = require('../controller/status')


router.post('/taskstatus', addStatus);



module.exports = router