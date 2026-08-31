import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-pro-ultra-secure-and-pro-ultra-long-secret";

export default async function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ status: "fail", message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Invalid token" });
  }
}
