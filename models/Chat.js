const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  chat: {
    type: Object,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
