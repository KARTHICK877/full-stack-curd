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


// Configure MySQL connection
// const db = mysql.createConnection({
//   host: 'your_mysql_host',
//   user: 'your_mysql_user',
//   password: 'your_mysql_password',
//   database: 'your_database_name'
// });

// db.connect();

// // CREATE - Add a new message to the discussion
// app.post('/api/discussion', (req, res) => {
//   const { username, message } = req.body;
//   const sql = 'INSERT INTO discussions (username, message) VALUES (?, ?)';
//   db.query(sql, [username, message], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: 'Error adding message' });
//     } else {
//       res.json({ success: true, message: 'Message added successfully' });
//     }
//   });
// });

// // READ - Get all messages in the discussion
// app.get('/api/discussion', (req, res) => {
//   const sql = 'SELECT * FROM discussions';
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: 'Error getting messages' });
//     } else {
//       res.json({ success: true, discussions: result });
//     }
//   });
// });

// // DELETE - Remove a message from the discussion
// app.delete('/api/discussion/:id', (req, res) => {
//   const messageId = req.params.id;
//   const sql = 'DELETE FROM discussions WHERE id = ?';
//   db.query(sql, [messageId], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: 'Error deleting message' });
//     } else {
//       res.json({ success: true, message: 'Message deleted successfully' });
//     }
//   });
// });

// -----  sry i not have time to work  my sql  that's why i use mongoose



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
  console.log(`Server is runnings on port ${port}`);
});
