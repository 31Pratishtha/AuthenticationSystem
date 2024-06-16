import jwt from 'jsonwebtoken';

function generateToken(user) {
    const paylod = {
        id: user._id,
        email: user.email
    }
  return jwt.sign(paylod, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN);
}

export {
    generateToken,
    verifyToken
}