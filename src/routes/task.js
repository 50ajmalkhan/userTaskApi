const express = require('express');
const router = express.Router();
const { addTask, updateTask, getTask } = require('../controller/task')


router.post('/createtask', addTask);
router.post('/getTask', getTask);
router.post('/updatetask', updateTask);



module.exports = router