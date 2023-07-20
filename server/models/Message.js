const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  // Add additional fields for text formatting, mentions, etc.
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
