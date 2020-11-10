const express = require('express');
const router = express.Router();
const { createTask, updateTask, getTask } = require('../controller/task')


router.post('/createtask', createTask);
router.post('/getTask', getTask);
router.post('/updatetask', updateTask);



module.exports = router