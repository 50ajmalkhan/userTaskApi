const express = require('express');
const router = express.Router();
const { detailTask, countTask } = require('../controller/details')


router.get('/detailtask', detailTask);
router.post('/counttask', countTask);



module.exports = router