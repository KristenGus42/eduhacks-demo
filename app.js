import express from 'express';
import { chat } from './scripts/openai-test.js';
const app = express();

app.get('/testing', async (req, res) => {
  const userInput = req.query.message;

  if (userInput) {
    const chatRes = await chat(userInput);
    let chatHTML = "";
    for (let i = 0; i < chatRes.length; i++) {
      if (chatRes[i].role == "user") {
        chatHTML += "<p><strong>" + chatRes[i].content + "</strong></p>";
      } else {
        chatHTML += "<p>" + chatRes[i].content + "</p>";
      }
    }
    res.send(chatHTML);
  } else {
    res.status(400).send('missing userInput param')
  }
})

app.listen(3000);