const User=require('./user')
async function insertUser() {
    try {
      const newUser = await User.create({
        name: 'Amarjeet Kumar',
        email: 'amarjeet802213@gmail.com',
        age:26,
      });
      console.log('User created:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  }
  
  // Insert a new user
  insertUser();
  