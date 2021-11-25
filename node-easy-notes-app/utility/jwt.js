require('dotenv').config();
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

exports.generateToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.mySecretKey,
    { expiresIn: "1d" }
  );
};

exports.verifyToken = (token,callback) => {
   return jwt.verify(token, process.env.mySecretKey,(err,data)=>{
    return err ? callback(err, null) : callback(null, data);
   });
};

exports.generateRandomCode = () => {
  return crypto.randomBytes(20).toString('hex');
}