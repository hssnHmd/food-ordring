import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 60,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: [Number],
      required: true,
    },
    extraOptiens: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);
