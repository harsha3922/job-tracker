const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "not authorized you",
    });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //application ma jaygi 
    req.user = decoded.id;

    next();




  } catch (error) {

    return res.status(401).json({ message: "Not authorized" });
  }
};


module.exports = {protect};
