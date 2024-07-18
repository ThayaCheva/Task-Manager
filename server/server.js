require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/task-routes');
const userRoutes = require('./routes/user-routes');

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json({ limit: '10mb' }));

// Parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & Listening to port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
