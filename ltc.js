const requests = require('axios');

const HOOK = 'https://canary.discord.com/api/v9/x/xx';

const fetch = async () => {
  try {
    const response = await requests.get('https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd');
    return response.data.litecoin.usd;
  } catch (error) {
    console.error('Error :', error);
    return null;
  }
};

const send = (price) => {
    requests.post(HOOK, {
      content: `$${price}`
    }).then(() => {console.log(`$${price}`);}).catch((error) => {
      console.error('Error :', error.message);
    });
  };

const run = async () => {
  try {
    while (true) {
      const price = await fetch();
      if (price !== null) {
        send(price);
      }
      await new Promise((resolve) => setTimeout(resolve, 5000)); 
    }
  } catch (error) {
    console.error('Error :', error);
  }
};

run();
