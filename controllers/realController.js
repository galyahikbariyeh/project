
const { default: mongoose } = require('mongoose');
const RealEstate = require ('../models/realEstate');
const multer = require('multer');
require('dotenv').config();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  exports.addProperty = [
    upload.single('image'),
    async (req, res) => {
      try {
        const { title, price } = req.body;
        const image = req.file ? req.file.filename : null;
  
        const newProperty = new Property({
          title,
          price,
          image
        });
  
        await newProperty.save();
        res.status(201).json({ message: 'تم إضافة العقار بنجاح', property: newProperty });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  ];
exports.getAllReal= async(req,res)=>{
    try{
        const realestate = await RealEstate.find();  
        res.status(200).json(realestate) 
      
    } 
    catch(error){
        res.status(500).json({message:error.message}) 
    }
}

//creat

/*exports.createReal = async (req,res)=>{
    const {title,price,image} = req.body || {};
    try {
       
        realestates  ={title,price,image}
        savedReal = new RealEstate(realestates)
        savedReal.save()
        res.status(200).json({message:'RealEstate created  successfully',savedReal})
         
       
    }
    
    catch (error){
        res.status(500).json({message:error.message})
    }

 }*/
//addtype
    exports.createReal = async (req, res) => {
        const { title, price} = req.body;
        const image = req.file?.filename;
      
        if (!title || !price || !image   ) {
          return res.status(400).json({ message: 'الرجاء تعبئة كل الحقول وإرفاق صورة' });
        }
      
        try {
          const newReal = new RealEstate({ title, price, image, type });
          await newReal.save();
          res.status(201).json({ message: 'تمت الإضافة بنجاح', real: newReal });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };
      
//get by title
 /*exports.getRealBuyTitle = async(req,res)=>{
    const{title}= req.body;
    try{
          const  realestate= await RealEstate.find({title:title})
          res.status(200).json(realestate)
    }
    catch(error){
res.status(500).json({message:error.message})
    }
 }*/


  //{update}
//addtype
  exports.updateReal = async (req , res) => {
    const {id}=req.params
    const {title,price,image}=req.body
    try {
        const realestate = await  RealEstate.findByIdAndUpdate(id,{title,price,image})
        res.status(200).json({message:'RealEstate update successfully'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

//deletereal
exports.deleteReal = async (req , res) => {
    const {id}=req.params
   
    try {
        const realestate = await  RealEstate.findByIdAndDelete(id)
        res.status(200).json({message:'RealEstate delete successfully',realestate:realestate})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}
//get real by id
exports.getRealbyId = async (req , res) => {
    const {id}=req.params
   
    try {
        const realestate = await  RealEstate.findById(id)
        res.status(200).json({realestate})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}
