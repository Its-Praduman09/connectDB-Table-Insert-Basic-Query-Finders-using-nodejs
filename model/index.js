const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('developer', 'root', 'Badal@123', {
  host: 'localhost',      // Replace with your host, e.g., 'localhost' or an IP address
  dialect: 'mysql',       // Specify the dialect; 'mysql' in this case
  logging: false,         // Optional: Disable logging; can be useful in development
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
