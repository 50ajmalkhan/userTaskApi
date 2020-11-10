const express = require('express');
const router = express.Router();
const { signup, getAllUser, updateUser, deleteUser } = require('../controller/user')


router.post('/createuser', signup);
router.get('/getuser', getAllUser);
router.post('/updateuser', updateUser);
router.delete('/deleteuser', deleteUser)



module.exports = router