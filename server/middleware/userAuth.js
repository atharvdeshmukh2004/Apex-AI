import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
  try {
    let token = req.cookies?.token;
    if (!token) {
      const authHeader = req.headers?.authorization || req.headers?.Authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const secret = process.env.JWT_SECRET || 'dev_secret';
    const decoded = jwt.verify(token, secret);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token payload' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or expired token' });
  }
};

export default userAuth;