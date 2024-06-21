# Prevail

Welcome to Prevail! This is an dynamic AI assisted mental health resource. It is powered by OpenAI's 3.5-Turbo.

**Link to project:** https://prevail-production.up.railway.app/

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Express.js, MongoDB, EJS, and powered by OpenAI.

This is a project I built because taking the first step is hard. I previously worked in the 911 system, which is a very mentally challenging carreer. Sometimes, I just wanted an unbias ear, and that's exactly what Prevail is. Inside you will meet Grace. She has a memory and access to the information you provide her to enchance user experience and usability. Her memory was achieved by taking the user prompt, and the response from OpenAI, and storing them in a DB, from there, she has access to the DB and can reference information as needed. She also has access to specific information passed to her with the request (name, username, etc.), to better personalize the experience.

## Optimizations

- Truncate and limit token usage for requests. Due to the way the memory is handled, sometimes the requests can get heavy. Truncation and token limits would help with this issue.
- Changing the way the chats show up. Right now they are accessed in the DB. Implementing something live, such as a React chat feed could improve usability slightly.

## Lessons Learned:

Implementing memory into AI was different than I thought it was going to be. My DB method accesses all memories and uses the mass collection of data as context. An optimization would be to implement a secondary bot that parses through the bank of memories, and chooses the ones that are appropriate to bring up in the conversation; almost like a second brain behind the scenes to just handle the way the data is mananged in the DB. This would use a seperate GPT, with seperate tokens, but should still cut down on the total token usage, as my current DB access method is quite heavy.
