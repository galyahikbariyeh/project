const express = require('express');
const multer = require('multer');
const {getAllReal,createReal,updateReal,deleteReal,getRealbyId} = require('../controllers/realController')
const{adminAuth,getAllUsers}=require('../controllers/userController')

const router  = express.Router()
router.get('/real',getAllReal)
router.get('/users',getAllUsers)
router.post('/createreal',createReal)
router.get('/adminAuth',adminAuth)
router.put('/updateReal/:id',updateReal)
router.delete('/deleteReal/:id',deleteReal)
router.get('/getRealbyId/:id',getRealbyId)

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
  });
  
  const upload = multer({ storage });
  
  // إرسال البيانات مع صورة
  router.post('/real', upload.single('image'), createReal);



module.exports=router;
