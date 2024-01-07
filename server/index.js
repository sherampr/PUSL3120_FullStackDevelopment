require('dotenv').config();

const express = require('express');
const roomRoutes = require('./routes/rooms');
const roomTypeRoutes = require('./routes/roomTypes');
const cors = require('cors');
const MenuItem = require('./models/MenuItem');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const randomNum = Math.floor(Math.random() * (999999 - 99999 + 1)) + 99999;
        cb(null, randomNum + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
//routes
app.use('/api/rooms', roomRoutes)

app.use('/api/roomtypes', roomTypeRoutes)

//DB connection
if (require.main === module) {
    mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to db and listening on port ", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

app.get('/menu', async (req, res) => {
    try {
        const users = await MenuItem.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




app.post('/admin/menu/add', upload.single('image'), async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const image = req.file ? req.file.filename : null;

        const menuItem = new MenuItem({
            name: name,
            price: price,
            category: category,
            image: image,
        });

        await menuItem.save();

        res.status(201).json({ message: 'Menu item created successfully', menuItem });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
});



app.put('/menu/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const { price } = req.body;

    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(itemId, { price }, { new: true });
        if (!updatedItem) {
            return res.status(404).send({ message: 'Menu item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});



app.delete('/menu/:itemId', async (req, res) => {
    const { itemId } = req.params;

    try {
        const result = await MenuItem.findByIdAndDelete(itemId);
        if (!result) {
            return res.status(404).send({ message: 'Menu item not found' });
        }
        res.send({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = app;