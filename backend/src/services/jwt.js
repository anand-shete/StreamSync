import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET_KEY;

const generateToken = (student) => {
  const payload = {
    _id: student.id,
    name: student.name,
    email: student.email,
  };
  return jwt.sign(payload, secret);
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

export { generateToken, verifyToken };