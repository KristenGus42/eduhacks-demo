import express from 'express';
import { chat } from './scripts/openai-test.js';
const app = express();

app.get('/testing', async (req, res) => {
  res.type('text');

  const userInput = req.query.message;

  if (userInput) {
    const chatRes = await chat(userInput);
    res.send(chatRes.message.content);
  } else {
    res.status(400).send('missing userInput param')
  }
})

app.listen(3000)