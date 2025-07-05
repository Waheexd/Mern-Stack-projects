import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/Mongodb.js';
import connectCloudinary from './config/Cloudinary.js';
import UserRoute from './routes/UserRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import cartRouter from './routes/CartRoute.js';
import orderRouter from './routes/OrderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to DB & Cloudinary
connectDb();
connectCloudinary();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/user', UserRoute);
app.use('/api/product', ProductRoute);

app.use('/api/cart', cartRouter);

app.use('/api/order',orderRouter)
// ✅ Root Test Route
app.get('/', (req, res) => {
  res.send('✅ API WORKING');
});

// ✅ Start Server
app.listen(port, () => console.log(`🚀 Server started on port ${port}`));
