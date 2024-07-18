require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task-routes');
const userRoutes = require('./routes/user-routes');
// express app
const bodyParser = require('body-parser');
const app = express();

// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & Listening to port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
