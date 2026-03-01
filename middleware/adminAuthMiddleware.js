const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
  console.log("Hello everyone");
  const authHeader = req.headers.authorization;
  console.log("The field for auth:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    console.log("INside of the try block : ");
    const token = authHeader.split(" ")[1];
    console.log();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.log("Inside of the catch block ; ");
    return res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = { protectAdmin };
