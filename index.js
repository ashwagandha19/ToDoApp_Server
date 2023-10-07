const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

const cors = require("cors");
const corsOptions = require('./config/corsOptions')
app.use(cors(corsOptions))



const taskRoute = require('./router/taskRoute');

app.use("/tasks", taskRoute)

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
