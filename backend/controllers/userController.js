// userController.js
const fs = require('fs');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

let ipfsHash;
const pinataSDK = require('@pinata/sdk');
const pinataKey = process.env.PINATA_API_KEY;
const pinateSecretKey = process.env.PINATA_SECRET_API_KEY;
const pinata = new pinataSDK({pinataJWTKey: pinataKey});
const filePath = path.join(__dirname, '..', 'FlightsInformation.txt');
const downloadPath = path.join(__dirname, '..', 'ipfsFile', 'downloadedFile.txt');

  const IsPayed = async(req, res) => {
    try{
      if(req)
      {
        const flightInformations = req.body;
        if(flightInformations != null && await CreateAndSendFile(flightInformations))
          await downloadFromPinata(ipfsHash, downloadPath);
        else
        {
          console.log('File cant downloaded from ipfs');
          res.json({message: 'File cant downloaded from ipfs'});
        }
        res.json({message: 'Payment and FlightInformation file sending from IPFS is succesfull.'});
      }
      else
      {
        console.log('Payment cant taken from user');
        res.json({message: 'Payment cant taken from user'});
      }

    }catch (error){
      console.log('Error detected when creaating, sending or downloaded file. Error = ' + error);
      res.json({message: 'Error detected when creaating, sending or downloaded file. Error = '  + error});
    }
  }

  const CreateAndSendFile = async (flightInformations) =>{
    try{
      // Create file for sending flight information txt via ipfs
      //appendFile
      let formattedFlightInfo = 'Thank you for choosing us. Here is your flight information:\n';
      for (const key in flightInformations) {
        formattedFlightInfo += `${key}: ${flightInformations[key]}\n`;
      }
      fs.writeFile('FlightsInformation.txt', formattedFlightInfo, (err) => {
        if (err) throw err;
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
          name: 'FlightInformation',
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
      const absolutePath = path.resolve(destinationPath);
  
      // Ensure that the directory structure exists
      await fs.promises.mkdir(path.dirname(absolutePath), { recursive: true });
  
      // Make a GET request to Pinata API's getDataByHash endpoint
      console.log('Downloaded this ipfs hash: ' + ipfsHash);
      const response = await axios.get(`https://blue-passive-asp-55.mypinata.cloud/ipfs/${ipfsHash}`, {
        headers: {
          'pinata_api_key': pinataKey,
          'pinata_secret_api_key': pinateSecretKey
        }
      });
  
      // Check if the response contains the file content
      if (response.status === 200 && response.data) {
        // Write the file content to the destination path
        await fs.promises.writeFile(absolutePath, response.data);
        console.log('File downloaded from Pinata:', absolutePath);
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