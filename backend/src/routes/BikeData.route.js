// routes/BikeData.routes.js
import express from 'express';
import { getAllOrders } from '../controller/BikeData.controller.js';

const BikeRouter = express.Router();

BikeRouter.get('/data', getAllOrders);

export default BikeRouter;
