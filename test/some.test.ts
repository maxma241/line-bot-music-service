
import * as crypto from 'crypto'
import * as brypto from 'bcrypt'
import moment = require('moment')

(async () => {

  const pwd = 'abcd1234'
  const ret = crypto.createHash('sha256').update(pwd).digest('base64')
  const ret2 = await brypto.hash(pwd, 10)
  const ret3 = await brypto.hash(pwd, 9)
  
  console.log(ret2);
  console.log(ret3);
  console.log(brypto.compareSync(pwd, ret2));
  console.log(brypto.compareSync(pwd, ret3));

  console.log(moment(new Date('2019-12-17 11:48:26.429Z')).isBefore(moment()))

})()