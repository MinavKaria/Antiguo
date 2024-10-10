import express from 'express';
import Product from '../models/product.js';
import Order from '../models/orders.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

export default router;