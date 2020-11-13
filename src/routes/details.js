const express = require('express');
const router = express.Router();
const { detailTask, countTask, nodersa } = require('../controller/details')


router.get('/detailtask', detailTask);
router.post('/counttask', countTask);
// router.post('/nodersa', nodersa);



module.exports = router