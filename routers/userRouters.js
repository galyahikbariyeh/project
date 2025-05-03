const express = require('express');
const {getAllUsers,createUser,getUserBuyName,updateUser,deleteUser,login,auth,getUserbyId,adminAuth} = require('../controllers/userController')

const router  = express.Router()
router.get('/users',adminAuth,getAllUsers)
router.get('/users',getUserBuyName)
router.post('/createUser',createUser)
router.put('/updateUser/:id',updateUser)
router.delete('/deleteUser/:id',deleteUser)
router.post('/login',login)

router.get('/auth',auth)
router.get('/adminAuth',adminAuth)
router.get('/getUserbyId/:id',getUserbyId)






module.exports=router;
