
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 4500

const { users } = require('./state')

app.use(express.json());
app.use(bodyParser.json());
/* BEGIN - create routes here */

// GET Users

app.get('/users', (req, res) => {
  res.json(users)
})
console.log();

// GET User By ID 

app.get('/users/:id', (req, res) => {
  const user = users.find((user) => user._id == req.params.id);
  res.json(user);
});

// POST Users
app.post('/users', (req, res) => {
  
  const hardcodedUser = {
    _id: users.length + 1, 
    name: 'Bryan Aldridge',
    occupation: 'Student',
    avatar: 'https://example.com/Bryan.jpg'
  };

  
  users.push(hardcodedUser);

  res.json(users[users.length - 1]);
});

// PUT Users

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(user => user._id === userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const updatedData = {
    name: 'Bryan Aldridge',
    occupation: 'Student',
  };

  for (const key in updatedData) {
    if (updatedData.hasOwnProperty(key)) {
      user[key] = updatedData[key];
    }
  }

  res.json(user);
});

// DELETE Users

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); 

  const userIndex = users.findIndex(user => user._id === userId);

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(userIndex, 1);

  res.send("deleted");
});

// Body-Parser

app.post('/users', (req, res) => {
  console.log('req.body', req.body);

  const newUser = {
    ...req.body,
    _id: users.length + 1
  };

  users.push(newUser);

  console.log(users);

  res.json(newUser);
});


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))