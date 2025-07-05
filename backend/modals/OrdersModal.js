import mongoose from "mongoose"

const ordersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true },
  paymentMethod: { type: String, required: true }, // ✅ FIXED SPELLING
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true }
});

const ordersModal =mongoose.models.orders || mongoose.model("orders",ordersSchema)

export default ordersModal