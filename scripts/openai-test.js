import OpenAI from "openai";

const openai = new OpenAI();

const messages = [];

export async function chat(query) {
  messages.push({ role: "user", content: query });

  console.log("Waiting for response...");
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  console.log("Tokens used: " + completion.usage.total_tokens);
  messages.push({ role: "assistant", content: completion.choices[0].message.content });

  return messages;
}