import chalk from 'chalk';

const formatTime = (timeStr) => {
  if (Number(timeStr) < 10) return `0${timeStr}`;
  return timeStr;
};

export const log = (prefix, message) => {
  const start = new Date();
  const time = [
    formatTime(start.getHours()),
    formatTime(start.getMinutes()),
    formatTime(start.getSeconds()),
    start.getMilliseconds()
  ].join(':');
  console.log(`${chalk.bold(`[${time}] » ${prefix}`)} ${message}`);
};

const colorCodes = {
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green'
};

const icons = {
  5: '✗',
  4: '~',
  3: '→',
  2: '✓',
  1: '✓'
};

const loggerMiddleware = (prefix) => (ctx, next) => {
  const start = new Date();

  return next().then(() => {
    const ms = new Date() - start;
    const s = ctx.status / 100 | 0;
    const color = colorCodes[s];
    const status = chalk[color](ctx.status);
    const icon = chalk[color](icons[s]);

    if (ctx.url !== '/favicon.ico') {
      log(prefix, `${icon} ${chalk.bold(ctx.method)} ${ctx.url} ${status} - ${ms}ms`);
    }
  });
};

export default loggerMiddleware;
