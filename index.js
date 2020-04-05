
const handler = require('./src/bot/line').default
module.exports = async function App(context) {
  return handler(context)
};