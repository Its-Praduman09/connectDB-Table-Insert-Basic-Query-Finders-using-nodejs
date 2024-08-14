const express = require('express')
const bodyParser=require('body-parser')
require('./model/index')
require('./model/user')
require('./model/contact')
const app = express()
app.use(bodyParser.json())// it is recuired
const User=require('./model/user')

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// Here routers is created

app.get('/findall', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });
  // Get a specific user by ID
app.get('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found!' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });

  // Create a new user
  app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a user by ID
app.put('/user/:id', async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);
      if (user) {
          await user.update(req.body);
          res.status(200).json(user);
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});
  // Delete a user
app.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.json({ message: 'User deleted!' });
      } else {
        res.status(404).json({ error: 'User not found!' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });

  //Model Querying - Finders
  app.get('/users/one/:email', async (req, res) => {
    try {
        const user = await User.findOne({ where: {email: req.params.email}});
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// 4. Find or create a user using findOrCreate
app.post('/create', async (req, res) => {
  try {
      const [user, created] = await User.findOrCreate({
          where: { email: req.body.email },
          defaults: req.body
      });
      res.json({ user, created });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// 5. Get users with count using findAndCountAll
app.get('/users/count', async (req, res) => {
  try {
      const result = await User.findAndCountAll();
      res.json(result);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
// 6. Get users with filters, sorting, and pagination using findAll
app.get('/users/filtered', async (req, res) => {
  try {
      const users = await User.findAll({
          where: {email: 'praduman802213@gmail.com' },
          order: [['name', 'ASC']],
          limit: 2,
          offset: 0
      });
      res.json(users);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.listen(3000,()=>{
    console.log("App will run on: http://localhost:3000")
})