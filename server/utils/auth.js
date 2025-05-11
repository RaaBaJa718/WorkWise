const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'supersecretkey';
const expiration = '2h';

module.exports = {
    signToken: function(user) {
        return jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: expiration });
    },
    authenticateToken: function(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            req.user = jwt.verify(token, secret);
            next();
        } catch {
            res.status(401).json({ message: 'Invalid token' });
        }
    }
};