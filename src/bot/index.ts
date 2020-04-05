import { bottender } from 'bottender';

export const bottenderCtx = bottender({
  dev: false
});

const botHandler = bottenderCtx.getRequestHandler();

export const botCtx = {
  handler: botHandler,
  initial: async () => {
     bottenderCtx.prepare();
     return true;
  },
}