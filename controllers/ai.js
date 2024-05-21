const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const Chat = require('../models/Chat');

module.exports = {
  sendAiReq: async (req, res) => {
    try {
      //finds the chats that match the username and creates a variable for it
      const chatHistory = await Chat.find({ user: req.user });
      //creates a formatted history that is easier for the AI to read
      const formattedHistory = chatHistory
        .map((chat) => [
          { role: 'user', content: chat.chat.userPrompt },
          { role: 'assistant', content: chat.chat.botResponse },
        ])
        .flat();
      //destructures the prompt
      const { prompt } = req.body;
      //creates the message for the bot that includes the previous history first, then the current prompt
      let messages = [...formattedHistory, { role: 'user', content: prompt }];

      //await the creation of the response
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
      });
      // variable created for the response of the bot
      const botResponse = completion.choices[0].message.content;
      // Send the extracted text back to the client
      res.json({ text: botResponse });
      // Save the user's prompt and the bot's response to the database
      await Chat.create({
        chat: { userPrompt: prompt, botResponse: botResponse },
        user: req.user,
      });
    } catch (error) {
      console.error('Failed to fetch OpenAI completion:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};
