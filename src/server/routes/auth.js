/* eslint no-param-reassign: "off" */
import jwt from 'jsonwebtoken';
import config from '../../config';

export const login = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (username !== config.USER_NAME || password !== config.USER_PASS) {
    ctx.throw('Invalid credentials.', 401);
  } else {
    const payload = { sub: username };
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2 days' });

    ctx.body = { success: true, token };
    ctx.status = 200;
  }
};

export const verify = async (ctx) => {
  const { token } = ctx.request.body;

  await new Promise(resolve =>
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        ctx.throw('Invalid login token.', 401);
        return resolve();
      }

      if (decoded.sub !== config.USER_NAME) {
        ctx.throw('Invalid login token.', 401);
        return resolve();
      }

      ctx.body = { success: true, token };
      ctx.status = 200;
      return resolve();
    })
  );
};
