import { Router, RequestHandler } from 'express';
import { verifyLineTokenSvc } from '../../services/line';


const verifyLineToken: RequestHandler = async (req, res, next) => {
  
  const lineToken = req.headers.authorization;
  const lineUserId = req.headers['lui'] as string;

  try {
    const userProfile = await verifyLineTokenSvc(lineToken, lineUserId);
    req['payload'].lineProfile = userProfile;
    next();
  } catch (error) {
    res.json({
      success: false,
      status: 401,
      message: error.message
    }).end();
  }

}

export default [
  verifyLineToken
]


