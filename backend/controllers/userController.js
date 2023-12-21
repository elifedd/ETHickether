// userController.js
const { PassThrough } = require('stream');
const Web3 = require('web3');

const deneme = async (req, res) => {
    try {
      interactWithContract();
      // Handle the POST request
      const { key1, key2 } = req.body;
      console.log(req.body);
      // Create file for sending flight information txt via ipfs
      const fs = require('fs');
      fs.appendFile('FlightsInformation.txt', 'Will come to flights informations in here' + key1 + key2, (err) =>
      {
        if(err) throw err;
        console.log('File Created');
      });

      const responseData = { message: `File creaation is succesfull. Here is the keys: ${key1}, key2: ${key2}` };
      res.json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const interactWithContract = async () => {
    const infuraUrl = 'https://sepolia.infura.io/v3/222d3e706f52465eac2ae9e367260335';
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

    web3.eth.getBlockNumber().then((result) => {
      console.log("Latest Ethereum Block is ", result);
    });

    try {
      const accounts = await web3.eth.getAccounts();
      console.log('Account: ', accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }

    const abi = [
      {
        "inputs": [],
        "name": "count",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "increment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    const address = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";

    const contract = new web3.eth.Contract(abi, address);

    try {
      const result = await contract.methods.increment().call({ from: '0xfd8906788832bb74d686241aaFA8d94f428C7A11', gas: 2000000 });
      console.log('Result of calling increment function:', result);
    } catch (error) {
      console.error('Error calling increment function:', error);
    }

  };

  module.exports = {
    deneme,
  };
