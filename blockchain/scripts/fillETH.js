module.exports = async function (callback) {
  try{
      const accounts = await web3.eth.getAccounts();
    
      // Define the sender and recipients
      const sender = accounts[9];
      const recipients = [accounts[1], accounts[2], accounts[3], accounts[4]];
    
      // Target balance in Wei (100 ETH)
      const targetBalance = web3.utils.toWei('100', 'ether');
    
      for (const recipient of recipients) {
        const currentBalance = await web3.eth.getBalance(recipient);
    
        if (BigInt(currentBalance) < BigInt(targetBalance)) {
          const amountToSend = BigInt(targetBalance) - BigInt(currentBalance);
    
          try {
            const tx = await web3.eth.sendTransaction({
              from: sender,
              to: recipient,
              value: amountToSend.toString(),
            });
            console.log(`Transferred ${web3.utils.fromWei(amountToSend.toString(), 'ether')} ETH to ${recipient}. Transaction hash: ${tx.transactionHash}`);
          } catch (error) {
            console.error(`Failed to transfer ETH to ${recipient}:`, error);
          }
        } else {
          console.log(`${recipient} already has 100 ETH or more.`);
        }
      }
      callback();
    } catch (err) {
      console.error("Error in script:", err);
      callback(err);
  } 
}