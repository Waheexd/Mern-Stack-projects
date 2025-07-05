import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    let token = req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({ success: false, message: "Not Authorized User" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized User" });
    }

    next();
  } catch (error) {
    console.log("Admin Auth Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
