// userController.js
const { PassThrough } = require('stream');
const Web3 = require('web3');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

let ipfsHash;
const pinataSDK = require('@pinata/sdk');
const pinataKey = ''
const pinateSecretKey = process.env.PINATA_SECRET_API_KEY
const pinata = new pinataSDK({pinataJWTKey: pinataKey});
const filePath = 'E:\\GitHub\\ETHickether_ceng485\\backend\\FlightsInformation.txt';
//const testIPFSHash = 'QmRY9G3npHaYb3WPuXBxHh3jtXprmCrP9Ff4sexg4JdrCS';
const downloadPath = 'E:\\GitHub\\ETHickether_ceng485\\backend\\ipfsFile\\downloadedFile.txt';

  const IsPayed = async(req, res) => {
    try{
      if(req)
      {
        const flightInformations = req.body;
        if(flightInformations != null && CreateAndSendFile(flightInformations))
          await downloadFromPinata(ipfsHash, downloadPath);
        else
          console.log('File cant downloaded from ipfs');
      }
      else
        console.log('Payment cant taken from user');
    }catch (error){
      console.log('Error detected when creaating, sending or downloaded file. Error = ' + error);
    }
  }

  const CreateAndSendFile = async (flightInformations) =>{
    try{
      // Create file for sending flight information txt via ipfs
      //appendFile
      fs.writeFile('FlightsInformation.txt', 'Thank you for chosing us. Here is your flight informations:\n' + flightInformations,(err) =>
      {
        if(err) throw err;
        console.log('File Created');
      });
    }catch (error){
      console.log('Error detected when creating flight information file. Error = ' + error);
    }

    try{
      // Read file for sending in ipfs
      const fileStream = fs.createReadStream(filePath);
      const options = {
        pinataMetadata: {
          name: 'TicketImage',
        },
      };

      const result = await pinata.pinFileToIPFS(fileStream, options);
      ipfsHash = result.IpfsHash;
      console.log('File uploaded to Pinata with IPFS Hash:', ipfsHash);
      return true;
    }catch (error){
      console.log('Error detected when trying to upload flight infotmarion file to ipfs. Erro = ' + error);
    }
  }

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

  module.exports = {
    IsPayed,
  };
