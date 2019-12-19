import * as mongoose from 'mongoose'
import { mongoConfig } from '../config';

export const mongoDBConnect = async () => {
  const { host, port, database, poolSize } = mongoConfig;

  const db = mongoose.connection;

  db.once('open', () => {
    // logger.info(`mongodb connected`);
    console.log('mongodb connected');
  });

  db.on('error', (err) => {
    // logger.error('connection error:', err);
    console.log('connection error: ', err);
  })

  mongoose.connect(`mongodb://${host}:${port}/${database}?poolSize=${poolSize}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


}