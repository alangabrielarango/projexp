const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   //using header authorization to get the token after bearer
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN);
    next();
  } catch (error){
    res.status(401).json({
      msg: "Authentication Failed"
    });
  }

}
