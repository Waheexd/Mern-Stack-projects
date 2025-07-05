import express from 'express';
import cors from 'cors';
import {
  listProduct,
  addProduct,
  removeProduct,
  singleProduct
} from '../controllers/ProductController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRoute = express.Router();

productRoute.post(
  '/add',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

productRoute.post('/remove',adminAuth, removeProduct);
productRoute.post('/single',adminAuth, singleProduct);
productRoute.get('/list', listProduct);

export default productRoute;
