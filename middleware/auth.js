const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization
    var decoded = jwt.verify(token, '123123')
    req.user = decoded.data;
    next();
  } catch (error) {
    return res.status(200).json({
      message: "Auth Filed"
    });
  }
};

