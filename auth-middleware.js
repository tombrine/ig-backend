const jwt = require("jsonwebtoken");

const authMidlleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) res.json({ message: "no token in header" });

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);
  if (decodedToken) {
    req.user = decodedToken;
    next();
  } else {
    res.json({ message: "invalif token" });
  }
};

module.exports = authMidlleware;
