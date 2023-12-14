// Example server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/deneme', (req, res) => {
      // Handle the POST request
      const {key1, key2} = req.body;
      const requestData = req.body;
      console.log(requestData);
      // Process the data and send a response
      const responseData = { message: 'Here is the keys, key1: ' + key1 + ' key2: ' + key2 };
      res.json(responseData);
});
