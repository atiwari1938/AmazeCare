import sequelize from "./Backend/database/db.js";

async function testDatabaseConnection() {
  try {
    // Test the connection to the database
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the function to test the database connection
testDatabaseConnection();


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm1vbEBnbWFpbC5jb20iLCJVc2VyUm9sZSI6IlBhdGllbnQiLCJpYXQiOjE3MTQ5Nzg3NjksImV4cCI6MTcxNTU4MzU2OX0.rSl7PaVq05jqzkR3lHtSNRxFKQspswRgMHTzfnrAFM0