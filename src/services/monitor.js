const { Connection, PublicKey } = require('@solana/web3.js');
const axios = require('axios');
const { initializeLogger } = require('../utils/logger');
const config = require('../config');

const logger = initializeLogger(config.LOG_LEVEL);
const connection = new Connection(config.RPC_ENDPOINT, config.COMMITMENT_LEVEL);

const HERO_TOKEN_MINT = 'HERO_TOKEN_MINT';  // Replace with actual token mint address

const getTransactionHistory = async (walletAddress) => {
  try {
    const response = await axios.get(`https://public-api.solscan.io/account/transactions?account=${walletAddress}`);
    return response.data;
  } catch (error) {
    logger.error('Error fetching transaction history:', error);
    return [];
  }
};

const identifySpecificHolders = async () => {
  const allHolders = await getAllHolders(HERO_TOKEN_MINT);  // Implement this function to fetch all holders of HERO token
  const specificHolders = [];

  for (const holder of allHolders) {
    const transactions = await getTransactionHistory(holder);

    const tradesOnlyHeroToken = transactions.every(tx => tx.tokenTransfers.every(transfer => transfer.token === HERO_TOKEN_MINT));

    if (tradesOnlyHeroToken) {
      specificHolders.push(holder);
    }
  }

  return specificHolders;
};

module.exports = {
  identifySpecificHolders,
  getTransactionHistory,
};
