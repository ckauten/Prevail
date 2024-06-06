const Chat = require('../models/Chat');

module.exports = {
  //starts the home page get request
  getIndex: (req, res) => {
    res.render('index.ejs');
  },
  getResources: (req, res) => {
    res.render('resources.ejs');
  },
  getFaq: (req, res) => {
    res.render('faq.ejs');
  },
  getAbout: (req, res) => {
    res.render('about.ejs');
  },
  //renders home page once logged in
  getHome: async (req, res) => {
    try {
      // Find all chats for the user, sorted by creation date
      const chats = await Chat.find({ user: req.user }).sort({ createdAt: 'asc' }).lean();

      // Check the chat count for the user
      const chatCount = await Chat.countDocuments({ user: req.user });

      // If no chats exist, create a default chat
      if (chatCount === 0) {
        await Chat.create({
          chat: {
            userPrompt: `your name is Grace. You are a mental health assistant. The users name is ${req.user}. Your answers will be gentle and concise`,
            botResponse: 'ok i will remember that and not ask how i can support the user every time',
          },
          user: req.user,
        });
        // Re-fetch the chats after creating the default chat
        const updatedChats = await Chat.find({ user: req.user }).sort({ createdAt: 'desc' }).lean();
        return res.render('home.ejs', { chats: updatedChats });
      }

      // Render the home page with chats
      res.render('home.ejs', { chats: chats });
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  },
  //clears chat history
  clearChat: async (req, res) => {
    try {
      // Delete all chats for the user
      await Chat.deleteMany({ user: req.user });
      // Send a success response
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};
