// userController.js
const deneme = async (req, res) => {
    try {
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
  
  module.exports = {
    deneme,
  };
  