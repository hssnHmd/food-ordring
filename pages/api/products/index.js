import Product from '@/models/Product';
import dbConnect from '@/util/mongoDb';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  if (method === 'POST') {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
