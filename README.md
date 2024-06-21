# Prevail

Welcome to Prevail! This is an dynamic AI assisted mental health resource. It is powered by OpenAI's 3.5-Turbo.

**Link to project:** https://prevail-production.up.railway.app/

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Express.js, MongoDB, EJS, and powered by OpenAI.

This project was built because taking the first step is hard. I previously worked in the 911 system, a very emotionally strenuous career. Sometimes, I just wanted an unbiased ear, and that's exactly what Prevail offers. Inside, you will meet Grace. She has a memory and access to the information you provide her to enhance the user experience. Her memory was achieved by taking the user prompt, and the response from OpenAI, and storing them in a DB. From there, she has access to the DB and can reference information as needed. She also has access to specific information passed to her with the request (name, username, etc.), to better personalize the experience. The site features a reactive resource page, built with some simple JS and CSS, and a reactive FAQ with dropdowns. Featured on the home page is a feedback dropdown and a clear chat button, which accesses the DB and clears out the chats related to that specific user's account.

## Optimizations

- Truncate and limit token usage for requests. Due to the way the memory is handled, sometimes the requests can get heavy. Truncation and token limits would help with this issue.
- Changing the way the chats show up. Right now, they are accessed in the DB. Implementing something live, such as a React chat feed, could improve usability slightly.

## Lessons Learned:

Implementing memory into AI was a different experience than I thought it would be. My DB method accesses all memories and uses the mass collection of data as context. An optimization would be to implement a secondary bot that parses through the bank of memories and chooses the ones that are appropriate to bring up in the conversation; almost like a second brain behind the scenes to just handle the way the data is managed in the DB. This would use a separate GPT, with separate tokens, but should still cut down on the total token usage, as my current DB access method is quite heavy.

I chose to handle the guest account by making all the guests use a single account that is automatically signed into when 'Continue as guest' is clicked. Using my existing authentication, I was able to hard-code the guest button to sign in with specified credentials. The chat is automatically cleared for that session when a user logs into the guest account. Managing a DB and the dynamic rendering of the chat feed was a challenge but was solved by awaiting the deletion of chats before rendering is allowed.
