// Given
import express from 'express';
const app = express();
const KEY = "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";

// DEMO CODE
'use strict';
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// DEMO CODE
import OpenAI from "openai";

const openai = new OpenAI({apiKey: KEY});

const messages = [];

export async function chat(query) {
  messages.push({ role: "user", content: query });

  console.log("Waiting for response...");
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  console.log("Tokens used: " + completion.usage.total_tokens);
  messages.push({ role: "assistant", content: completion.choices[0].message.content});

  return completion.choices[0];;
}


app.get('/response/:message', async (req, res) => {
  res.type('text');

  const userInput = req.params.message;

  if (userInput) {
    const chatRes = await chat(userInput);
    res.send(chatRes.message.content);
  } else {
    res.status(400).send('missing userInput param')
  }
})

// Give
app.use(express.static('scripts'));
app.listen(3000)