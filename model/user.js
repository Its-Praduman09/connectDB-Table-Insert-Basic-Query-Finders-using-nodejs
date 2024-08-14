const sequelize = require('./index'); // Import the sequelize instance

const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'users',  // Optional: specify the table name
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('User table has been created.');
  })
  .catch(error => {
    console.error('Error creating the table:', error);
  });
  module.exports=User
