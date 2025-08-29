// controllers/BikeData.controller.js
import Order from '../models/BikeData.model.js';  // Adjust path & import style accordingly

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
