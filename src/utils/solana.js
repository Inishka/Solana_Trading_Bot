{/*const { Keypair, Connection } = require('@solana/web3.js');
const bs58 = require('bs58');
const config = require('../config');

const getWallet = () => {
  const privateKey = bs58.decode(config.PRIVATE_KEY);
  return Keypair.fromSecretKey(privateKey);
};

const getConnection = () => {
  return new Connection(config.RPC_ENDPOINT, config.COMMITMENT_LEVEL);
};

module.exports = {
  getWallet,
  getConnection,
};

*/}
const bs58 = require('bs58');
const { Keypair } = require('@solana/web3.js');
const config = require('../config');

function getWallet() {
    try {
        const privateKey = bs58.decode(config.PRIVATE_KEY);
        return Keypair.fromSecretKey(Uint8Array.from(privateKey));
    } catch (error) {
        console.error('Failed to decode private key:', error);
        process.exit(1);
    }
}

module.exports = {
    getWallet,
};

