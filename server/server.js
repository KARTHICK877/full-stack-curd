// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db'); // Update the path accordingly
const mongoose = require('mongoose'); // Ensure this line is present

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Connect to the MongoDB database
connectToDatabase();

// Create a schema for the discussion
const discussionSchema = new mongoose.Schema({
  username: String,
  message: String
});

// Define a User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  })
// Create a User model
const User = mongoose.model('User', userSchema);

// Create a model for the discussion
const Discussion = mongoose.model('Discussion', discussionSchema);
 
// CREATE - Add a new message to the discussion
app.post('/api/discussion', async (req, res) => {
  const { username, message } = req.body;
  const newDiscussion = new Discussion({ username, message });

  try {
    await newDiscussion.save();
    res.json({ success: true, message: 'Message added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding message' });
  }
});

// READ - Get all messages in the discussion
app.get('/api/discussion', async (req, res) => {
  try {
    const discussions = await Discussion.find({});
    res.json({ success: true, discussions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error getting messages' });
  }
});
app.put('/api/discussion/:id', async (req, res) => {
    const messageId = req.params.id;
    const { username, message } = req.body;
  
    try {
      const updatedDiscussion = await Discussion.findByIdAndUpdate(
        messageId,
        { username, message },
        { new: true } // Return the modified document
      );
  
      if (!updatedDiscussion) {
        // If the message with the given ID is not found
        return res.status(404).json({ success: false, message: 'Message not found' });
      }
  
      res.json({ success: true, message: 'Message updated successfully', updatedDiscussion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error updating message' });
    }
  });

// DELETE - Remove a message from the discussion
app.delete('/api/discussion/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    await Discussion.findByIdAndDelete(messageId);
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting message' });
  }
});
// SignUp route
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.json({ success: true, message: 'User signed up successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error signing up' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
