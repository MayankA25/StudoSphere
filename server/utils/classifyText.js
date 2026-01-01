// import { HfInference } from "@huggingface/inference";

import dotenv from "dotenv";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\CodeFest'25\\server\\.env" });

import Together from "together-ai";
const classifyText = async (text) => {
  console.log("Text: ", text);
  //   const response = await fetch("http://localhost:11434/api/generate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       model: "llama3",
  //       prompt: `classify the text "${text}" into one of these categories "General, Career, Campus Life, Lost and Found". Answer only with the category
  // `,
  //     }),
  //   });
  //   const reader = response.body.getReader();
  //   const decoder = new TextDecoder("utf-8");

  //   let message = "";

  //   while (true) {
  //     const data = await reader.read();
  //     if (data.done) {
  //       break;
  //     }
  //     const decodedData = decoder.decode(data.value, { stream: true });
  //     const newData = JSON.parse(decodedData);
  //     console.log(newData);
  //     message += newData.response;
  //   }
  //   console.log(message);
  //   return message
  // }

  // Hugging Face
  // const client = new HfInference(process.env.HF_TOKEN);

  let out = "";

  // const stream = client.chatCompletionStream({
  //   model: "meta-llama/Llama-3.1-8B-Instruct",
  //   messages: [{
  //     role: "user",
  //     content: `classify the text "${text}" into one of these categories "General, Career, Campus Life, Lost and Found". Answer only with the category.`
  //   }],
  //   provider: "hf-inference",
  //   temperature: 0.8,
  //   max_tokens: 500,
  //   top_p: 0.7,
  // });

  // for await (const chunk of stream) {
  //   if (chunk.choices && chunk.choices.length > 0) {
  //     const newContent = chunk.choices[0].delta.content;
  //     out += newContent;
  //     console.log(newContent);
  //   }
  // }

  const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY
  });

  const response = await together.chat.completions.create({
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    messages: [
      {
        role: "user",
        content: `classify the text "${text}" into one of these categories "General, Career, Campus Life, Lost and Found". Answer only with the category.`,
      },
    ],
  });

  console.log(response.choices[0].message.content);

  out = response.choices[0].message.content;

  return out;
};

export default classifyText;
