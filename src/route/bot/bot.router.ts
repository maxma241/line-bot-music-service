import { Router } from 'express';
import { botCtx } from '../../bot';

const router = Router();

router.all('/webhooks/line', (req, res) => {
  console.log('bot router')
  // res.status(200).json({success: true})
  return botCtx.handler(req, res)
});

export const botRouter = router;