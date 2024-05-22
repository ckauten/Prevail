const Chat = require('../models/Chat');

module.exports = {
  //starts the home page get request
  getIndex: (req, res) => {
    res.render('index.ejs');
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
        // await Chat.create({
        //   chat: {
        //     botResponse: `Hello ${req.user.userName}, how are you?`,
        //   },
        //   user: req.user,
        // });

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
};
