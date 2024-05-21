const Chat = require('../models/Chat');

module.exports = {
  //starts the home page get request
  getIndex: (req, res) => {
    res.render('index.ejs');
  },
  //renders home page once logged in
  getHome: async (req, res) => {
    res.render('home.ejs');
    //context initialization
    const chatCount = await Chat.countDocuments({ userId: req.user.id });
    if (chatCount == 0) {
      await Chat.create({
        chat: {
          userPrompt: `your name is Grace. You are a mental health assistant. The users name is ${req.user}. Your answers will be gentle and concise.`,
          botResponse: 'ok i will remember that',
        },
        user: req.user,
      });
    }
  },
};
