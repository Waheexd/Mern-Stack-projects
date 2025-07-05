import express from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/CartController.js';
import cors from 'cors';
import authUser from '../middleware/auth.js';

const cartRouter =express.Router();

cartRouter.post('/get',authUser, getUserCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter