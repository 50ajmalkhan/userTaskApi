const express = require('express');
const router = express.Router();
const { addItemToCart, updateTask, getTask } = require('../controller/task')


router.post('/createtask', addItemToCart);
router.post('/getTask', getTask);
router.post('/updatetask', updateTask);



module.exports = router