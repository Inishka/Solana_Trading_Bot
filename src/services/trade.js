const { getWallet, getConnection } = require('../utils/solana');
const { initializeLogger } = require('../utils/logger');
const { getTransactionHistory } = require('./monitor');
const config = require('../config');

const logger = initializeLogger(config.LOG_LEVEL);
const wallet = getWallet();
const connection = getConnection();

const executeBuy = async (tokenMint, amount) => {
  logger.info(`Executing buy for token: ${tokenMint} with amount: ${amount}`);

  try {
    const tokenPublicKey = new PublicKey(tokenMint);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: tokenPublicKey,
        lamports: amount, // Amount in lamports (1 SOL = 1e9 lamports)
      })
    );

    const signature = await connection.sendTransaction(transaction, [wallet]);
    await connection.confirmTransaction(signature);

    logger.info(`Buy transaction successful with signature: ${signature}`);
    return signature;
  } catch (error) {
    logger.error(`Buy transaction failed: ${error.message}`);
    throw error;
  }
};

const executeSell = async (tokenMint, amount) => {
  logger.info(`Executing sell for token: ${tokenMint} with amount: ${amount}`);

  try {
    const tokenPublicKey = new PublicKey(tokenMint);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: tokenPublicKey,
        toPubkey: wallet.publicKey,
        lamports: amount, // Amount in lamports (1 SOL = 1e9 lamports)
      })
    );

    const signature = await connection.sendTransaction(transaction, [wallet]);
    await connection.confirmTransaction(signature);

    logger.info(`Sell transaction successful with signature: ${signature}`);
    return signature;
  } catch (error) {
    logger.error(`Sell transaction failed: ${error.message}`);
    throw error;
  }
};

const monitorAndTrade = async (specificHolders) => {
  for (const holder of specificHolders) {
    const transactions = await getTransactionHistory(holder);

    transactions.forEach(async (tx) => {
      const solanaPurchase = tx.tokenTransfers.some(transfer => transfer.token === 'SOL' && transfer.type === 'buy');

      if (solanaPurchase) {
        logger.info(`Identified SOL purchase by ${holder}, executing preemptive buy.`);
        await executeBuy(HERO_TOKEN_MINT, config.QUOTE_AMOUNT);

        const tokenPurchase = tx.tokenTransfers.some(transfer => transfer.token === HERO_TOKEN_MINT && transfer.type === 'buy');

        if (tokenPurchase) {
          logger.info(`Identified HERO token purchase by ${holder}, executing sell.`);
          await executeSell(HERO_TOKEN_MINT, config.QUOTE_AMOUNT);
        }
      }
    });
  }
};

module.exports = {
  monitorAndTrade,
};
