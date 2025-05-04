/*const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRouter = require('./routers/userRouters');
const realRouter = require('./routers/realRoute');
const Property = require('./models/realEstate');
const cors=require('cors')
const multer = require('multer');
dotenv.config();
connectDB()
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  });
  
  const upload = multer({ storage });
  
  app.post('/add', upload.single('image'), async (req, res) => {
    const { title, price } = req.body;
    const image = req.file?.filename;
  
    const newProperty = new Property({ title, price, image });
    await newProperty.save();
  
    res.json({ message: 'تمت الإضافة بنجاح', property: newProperty });
  });
  app.use('/uploads', express.static('uploads'));


const app = express();
app.use(cors())
app.use(express.json())
app.use('/api',userRouter)
app.use('/api',realRouter)
app.use('/api',Property)


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server is running on port ${PORT}'))*/

const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRouter = require('./routers/userRouters');
const realRouter = require('./routers/realRoute');
const Property = require('./models/realEstate');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

dotenv.config();
connectDB();

const app = express(); // ✅ يجب أن يكون في الأعلى
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // لعرض الصور لاحقًا

// Multer إعداد 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only (JPEG, JPG, PNG)!');
    }
  }
});

app.post('/api/createreal', upload.single('image'), async (req, res) => {
  try {
    const { title, price ,type} = req.body;
    const image = req.file?.filename;

    const newProperty = new Property({ title, price, image,type });
    await newProperty.save();

    res.json({ message: '✅ تمت الإضافة بنجاح', property: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'حدث خطأ أثناء حفظ العقار' });
  }
});

// 🔧 Route لرفع عقار بصورة
app.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { title, price } = req.body;
    const image = req.file?.filename;

    const newProperty = new Property({ title, price, image });
    await newProperty.save();

    res.json({ message: '✅ تمت الإضافة بنجاح', property: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'حدث خطأ أثناء حفظ العقار' });
  }
});

// استخدام الراوترات
app.use('/api', userRouter);
app.use('/api', realRouter);

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server is running on port ${PORT}`));

