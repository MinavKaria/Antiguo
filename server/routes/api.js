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


router.get('/wallet/:id', async (req, res) => {
    console.log("Wallet");
    if(req.params.id==='undefined'){
        res.status(400).json({message:'User not found'});
    }
    else
    {
        const user=await User.findById(req.params.id);
        res.json(user.walletAmount);
    }
    
});

router.put('/wallet/order', async (req, res) => {
    console.log(req.body);
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    user.walletAmount -= amount;
    await user.save();
    res.json(user.walletAmount);
});

router.put('/wallet/:id', async (req, res) => {
    const user=await User.findById(req.params.id);
    console.log(req.body);
    user.walletAmount=req.body.walletAmount;
    await user.save();
    res.json(user.walletAmount);
});

router.post('/findUser', async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.json({
            message: 'User found',
            user
        });
    } else {
        res.json({ message: 'User not found' });
    }
});

router.post('/products', async (req, res) => {
    console.log(req.body);
    const data=req.body;
    const product = new Product(data);
    await product.save();
    res.json(product);
});

router.get('/products/:id', async (req, res) => {
    if(!req.params.id){
        res.status(400).json({message:'User not found'});
    }
    const product = await Product.findById(req.params.id);
    res.json(product);
});


router.get('/orders/:id', async (req, res) => {
    if(!req.params.id){
        res.status(400).json({message:'User not found'});
    }
    try {
        const userId = req.params.id;  
        const orders = await Order.find({ user: userId });  
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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
    if(!req.params.id){
        res.status(400).json({message:'User not found'});
    }
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

router.get('/orders', async (req, res) => {
    const orders = await Order.find({})
    res.json(orders);
});

router.put('/orders/return', async (req, res) => {
    const { orderId, productId } = req.body;
    const order = await Order.findById(orderId);
    order.returnStatus+=1;
    await order.save();
    res.json(order);

});

router.put('/orders/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    order.status = req.body.status;
    await order.save();
    res.json(order);
});

router.get('/orders/:id', async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'username');
    res.json(order);
});

router.get('/product/category/:category', async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
}
);







export default router;