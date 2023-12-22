// userController.js
const { PassThrough } = require('stream');
const Web3 = require('web3');
const fs = require('fs');
const axios = require('axios');

let ipfsHash;
const pinataSDK = require('@pinata/sdk');
const pinataKey = ''
const pinateSecretKey = ''
const pinata = new pinataSDK({pinataJWTKey: pinataKey});
const imagePath = 'E:\\GitHub\\ETHickether_ceng485\\backend\\FlightsInformation.txt';
const testIPFSHash = 'QmRY9G3npHaYb3WPuXBxHh3jtXprmCrP9Ff4sexg4JdrCS';



const deneme = async (req, res) => {
    try {
      //interactWithContract();

      // Handle the POST request
      //const { key1, key2 } = req.body;
      //console.log(req.body);
      // Create file for sending flight information txt via ipfs

      fs.appendFile('FlightsInformation.txt', 'Will come to flights informations in here',(err) =>
      {
        if(err) throw err;
        console.log('File Created');
      });

      //const responseData = { message: `File creaation is succesfull. Here is the keys: ${key1}, key2: ${key2}` };
      //res.json(responseData);

      const fileStream = fs.createReadStream(imagePath);
      const options = {
        pinataMetadata: {
          name: 'TicketImage',
        },
      };

      //const result = await pinata.pinFileToIPFS(fileStream, options);
      //ipfsHash = result.IpfsHash;
      console.log('Uploaded to Pinata. IPFS Hash:', ipfsHash);
      await downloadFromPinata(testIPFSHash, 'E:\\GitHub\\ETHickether_ceng485\\backend\\ipfsFile\\downloadedFile.txt');
      //await downloadFromPinata2(testIPFSHash, 'E:\\GitHub\\ETHickether_ceng485\\backend\\ipfsFile\\downloadedFile.txt');
      console.log('Downloadad file from to IPFS');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  async function downloadFromPinata(ipfsHash, destinationPath) {
    try {
      // Make a GET request to Pinata API's getDataByHash endpoint
      console.log(ipfsHash)
      const response = await axios.get(`https://blue-passive-asp-55.mypinata.cloud/ipfs/${ipfsHash}`, {
        headers: {
          'pinata_api_key': pinataKey,
          'pinata_secret_api_key': pinateSecretKey
        }
      });

      // Check if the response contains the file content
      if (response.status === 200 && response.data) {
        // Write the file content to the destination path
        fs.writeFileSync(destinationPath, response.data);
        console.log('File downloaded from Pinata:', destinationPath);
      } else {
        console.error('Error: Invalid response from Pinata API');
        console.error('Response:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Error: File not found on Pinata. Check the IPFS hash.');
      } else {
        console.error('Error downloading file from Pinata:', error);
      }
      throw error;
    }
  }




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
