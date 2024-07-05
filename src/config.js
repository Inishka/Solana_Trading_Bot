require('dotenv').config();

module.exports = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  RPC_ENDPOINT: process.env.RPC_ENDPOINT,
  RPC_WEBSOCKET_ENDPOINT: process.env.RPC_WEBSOCKET_ENDPOINT,
  COMMITMENT_LEVEL: process.env.COMMITMENT_LEVEL,
  LOG_LEVEL: process.env.LOG_LEVEL,
};
