import Order from '@/models/Order';
import dbConnect from '@/util/mongoDb';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  //   console.log(method);
  if (method === 'GET') {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  if (method === 'POST') {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
