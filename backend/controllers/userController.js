// userController.js
const deneme = async (req, res) => {
    try {
      // Handle the POST request
      const { key1, key2 } = req.body;
      console.log(req.body);
  
      // Process the data and send a response
      const responseData = { message: `Here is the key, key1: ${key1}, key2: ${key2}` };
      res.json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    deneme,
  };
  