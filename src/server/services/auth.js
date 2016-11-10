import jwt from 'jsonwebtoken';
import config from '../../config';

const AuthService = {
  createToken: (username, password) =>
    new Promise((resolve, reject) => {
      if (username !== config.USER_NAME || password !== config.USER_PASS) {
        reject();
      } else {
        const payload = { sub: username };
        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7 days' });
        resolve(token);
      }
    }),
  verifyToken: token =>
    new Promise((resolve, reject) => {
      if (!token) {
        reject();
      }

      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err || decoded.sub !== config.USER_NAME) {
          reject();
        }

        resolve();
      });
    })
};

export default AuthService;
