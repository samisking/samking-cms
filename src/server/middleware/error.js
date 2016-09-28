/* eslint no-param-reassign: "off" */

export const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    const message = err.toString();

    ctx.body = { status, message };
    ctx.status = status;
  }
};
