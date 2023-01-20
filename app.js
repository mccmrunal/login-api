const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

const hardcodedUsername = 'admin';
const hardcodedPassword = 'password';
const hashedPassword = bcrypt.hashSync(hardcodedPassword, 10); // this will be used to compare with user input

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  if (username !== hardcodedUsername) {
    return res.status(401).json({ error: 'Invalid username' });
  }

  if (!bcrypt.compareSync(password, hashedPassword)) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // if username and password match, return success
  res.json({ message: 'Login successful' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
