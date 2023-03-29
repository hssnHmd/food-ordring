import Product from '@/models/Product';
import dbConnect from '@/util/mongoDb';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  //   console.log(method);
  if (method === 'GET') {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  if (method === 'DELETE') {
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json('Product has been deleted successfully');
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  if (method === 'POST') {
    // try {
    //   const product = await Product.create(req.body);
    //   res.status(201).json(product);
    // } catch (error) {
    //   res.status(500).json({ error });
    // }
  }
}
