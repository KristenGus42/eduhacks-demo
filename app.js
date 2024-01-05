// GIVEN
import express from 'express';
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// 1: DEMO
const KEY = "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";
import OpenAI from "openai";
const openai = new OpenAI({apiKey: KEY});

// 2: DEMO
let messages = [];

export async function chat(query) {
  messages.push({ role: "user", content: query }); // Push user input

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  messages.push({ role: "system", content: completion.choices[0].message.content}); // Push bot output

  return completion.choices[0].message.content;
}

// 3: DEMO
app.get('/response/:message', async (req, res) => {
  res.type('text');

  const userInput = req.params.message;

  if (userInput) {
    const chatRes = await chat(userInput);
    res.send(chatRes);
  } else {
    res.status(400).send('missing userInput param')
  }
})

// GIVEN
app.use(express.static('scripts'));
app.listen(3000)