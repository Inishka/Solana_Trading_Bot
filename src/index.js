const { identifySpecificHolders } = require('./services/monitor');
const { monitorAndTrade } = require('./services/trade');
const { initializeLogger } = require('./utils/logger');
const config = require('./config');

const logger = initializeLogger(config.LOG_LEVEL);

const startBot = async () => {
  logger.info('Starting Solana Trading Bot...');
  const specificHolders = await identifySpecificHolders();

  setInterval(async () => {
    await monitorAndTrade(specificHolders);
  }, 60000);  // Monitor every 60 seconds
};

startBot();


{/*
    const { Connection, Keypair } = require('@solana/web3.js');
const config = require('./config');

const connection = new Connection(config.RPC_ENDPOINT, 'confirmed');
const wallet = Keypair.fromSecretKey(Buffer.from(config.PRIVATE_KEY, 'base64'));

// Example: Fetch account balance
async function fetchAccountBalance() {
    try {
        const balance = await connection.getBalance(wallet.publicKey);
        console.log('Wallet Balance:', balance);
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

// Example: Send a transaction
async function sendTransaction(recipientPublicKey, amount) {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: recipientPublicKey,
                lamports: amount,
            })
        );

        const signature = await connection.sendTransaction(transaction, wallet);
        console.log('Transaction sent:', signature);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

// Example usage
fetchAccountBalance();
sendTransaction('recipientPublicKey', 1000000); // Example amount in lamports

    */}