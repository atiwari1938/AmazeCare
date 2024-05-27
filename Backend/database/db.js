import mysql from "mysql2";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

const sequelize = new Sequelize("amazecare", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});

// const db = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.NAME
// });
// Authenticate to the database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to Database Successfully");
  })
  .catch((err) => {
    console.error("Error Connection to Database:", err);
  });

export default sequelize;
