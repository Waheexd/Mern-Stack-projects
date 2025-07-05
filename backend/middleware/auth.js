// middleware/auth.js
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token || req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied: No Token Provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to req object
    req.userId = decoded.id; // ✅ Better than modifying req.body
    next();

  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(403).json({ success: false, message: "Invalid or Expired Token", error: error.message });
  }
};

export default authUser;
