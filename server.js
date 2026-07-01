import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import parcelRouter from './routes/parcel.routes.js';
import User from './models/user.models.js';
import analyticsRouter from './routes/analytics.routes.js';
import { globalErrorHandler } from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/parcels', parcelRouter);
app.use('/api/analytics', analyticsRouter);

app.use(globalErrorHandler);

const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');

    app.listen(PORT, () => {
      console.log(`Server is running smoothly on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
  });