const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb+srv://shashanksuggala:chatappmern@cluster0.klarjml.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the chat message schema and model
const chatMessageSchema = new mongoose.Schema({
  content: String,
  sender: String,
  formatting: {
    bold: Boolean,
    italic: Boolean,
    underline: Boolean,
    strikethrough: Boolean,
    bulletedList: Boolean,
  },
  codeSnippet: String,
  photo: String,
  timestamp: { type: Date, default: Date.now },
});
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// API endpoints
router.get('/messages', async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort('-timestamp');
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/messages', upload.single('photo'), async (req, res) => {
  try {
    const { content, sender, formatting, codeSnippet } = req.body;
    const photo = req.file ? req.file.filename : undefined;
    const message = new ChatMessage({ content, sender, formatting, codeSnippet, photo });
    await message.save();
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mount the router
app.use('/api', router);

// Start the server
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
