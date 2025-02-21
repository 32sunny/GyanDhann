const express = require('express');
const app = express();
const todorouter = require('./Controller/todo.Routes')
const connectDB = require('./Config/db')
require('dotenv').config()
const cors = require('cors');
app.use(cors());


app.use(express.json()); 

app.use('/todo' , todorouter)



app.listen(process.env.port , () => {
    console.log(`Server is running on port ${process.env.port}`);
    connectDB()
  });
  

