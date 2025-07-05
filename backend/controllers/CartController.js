import userModal from "../modals/UserModal.js";
import auth from '../middleware/auth.js';


export const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // ✅ coming from verified JWT middleware
    const { itemID, size } = req.body;

    if (!itemID || !size) {
      return res.status(400).json({ success: false, message: "Missing itemID or size" });
    }

    const user = await userModal.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || {};
    if (!cartData[itemID]) cartData[itemID] = {};
    cartData[itemID][size] = (cartData[itemID][size] || 0) + 1;

    await userModal.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateCart = async (req, res) => {
  try {
    const { userId, itemID, size, quantity } = req.body;

    const user = await userModal.findById(userId);
    if (!user || !user.cartData || !user.cartData[itemID]) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    user.cartData[itemID][size] = quantity;
    await user.save();

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModal.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export default { addToCart, updateCart, getUserCart };
