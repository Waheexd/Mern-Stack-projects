import ordersModal from "../modals/OrdersModal.js";
import userModal from "../modals/UserModal.js";

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      name: `${address.firstName} ${address.lastName}`,
      status: "Pending",
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };

    const newOrder = new ordersModal(orderData);
    await newOrder.save();

    await userModal.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export other handlers (empty if not yet implemented)
const placeOrderRazorpay = async (req, res) => {};
const placeOrderStripe = async (req, res) => {};
const allOrders = async (req, res) => {};
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Securely extracted by auth middleware
    const orders = await ordersModal.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("user order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus
};