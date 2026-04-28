const jwt = require("jsonwebtoken");

/**
 * Basic JWT Authentication Middleware
 */
function authMiddleware(req, res, next) {
  // In a real app, require a valid token
  // For this demo/hackathon, we'll bypass it if no token is provided
  // or validate it if provided.
  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Optionally: return res.status(401).json({ error: "No token provided" });
    console.warn("No auth token provided, bypassing for demo purposes.");
    return next();
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
