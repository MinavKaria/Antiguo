import express from 'express';
import Product from '../models/product.js';
import Order from '../models/orders.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

router.post('/products', async (req, res) => {
    console.log(req.body);
    const data=req.body;
    const product = new Product(data);
    await product.save();
    res.json(product);
});


router.get('/orders', async (req, res) => {
    const orders = await Order.find({}).populate('user', 'username');
    res.json(orders);
});

router.post('/users', async (req, res) => {
    console.log(req.body);
    
    const { username, email, password, isAdmin } = req.body;

    

    try {
        const newUser = new User({
            username,
            email,
            password,
            isAdmin
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 11000) { 
            res.status(400).json({ message: 'Username or email already exists' });
        } else {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }
});

router.get('/users/:id', async (req, res) => {
    const user=await User.findById(req.params.id);
    res.json(user);
});


router.post('/orders', async (req, res) => {
    console.log(req.body);
    const data=req.body;
    const order = new Order(data);
    await order.save();
    res.json(order);
});


router.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }

});

router.get('/orders/:id', async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'username');
    res.json(order);
});






export default router;