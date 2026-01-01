import { Chatbot } from "../models/Chatbot.js";
import { getReceiverSocketId, io } from "../utils/socket.js";
// import { HfInference } from "@huggingface/inference";
import Together from "together-ai";
import dotenv from "dotenv";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\StudoSphere\\server\\.env" })

export const getChat = async (req, res) => {
  try {
    const response = await Chatbot.find({
      userId: req.session.passport.user.user._id,
    });
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ msg: "Error Occurred While Loading Previous Chat" });
  }
};

export const getResponse = async (req, res) => {
  const { prompt } = req.body;
  // const response = await fetch("http://localhost:11434/api/generate", {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //         model: "llama3",
  //         prompt: prompt,
  //         stream: true
  //     })
  // })

  // const reader  = response.body.getReader();
  // const decoder = new TextDecoder('utf-8')

  // let message = ""

  // const socketId = getReceiverSocketId(req.session.passport.user.user._id);
  // console.log("Sending: ", socketId);

  // while (true){
  //     const data = await reader.read();
  //     if(data.done){
  //         break
  //     }
  //     const decodedData = decoder.decode(data.value, { stream: true });
  //     const newData = JSON.parse(decodedData);
  //     console.log(newData)
  //     io.to(socketId).emit("token", newData.response);
  //     message += newData.response
  // }
  // console.log(message);

  // const newChat = new Chatbot({
  //   userId: req.session.passport.user.user._id,
  //   prompt: prompt,
  //   response: message
  // })

  // await newChat.save();

  // const client = new HfInference(process.env.HF_TOKEN);

  let message = "";

  // const stream = client.chatCompletionStream({
  //   model: "meta-llama/Llama-3.1-8B-Instruct",
  //   messages: [{
  //       role: "user",
  //       content: prompt
  //   }],
  //   provider: "hf-inference"
  // });

  // for await (const chunk of stream) {
  //   if (chunk.choices && chunk.choices.length > 0) {
  //     const newContent = chunk.choices[0].delta.content;
  //     io.to(getReceiverSocketId(req.session.passport.user.user._id)).emit("token", newContent);
  //     message += newContent;
  //     console.log(newContent);
  //   }
  // }

  const together = new Together({
    apiKey: "85120636a0ad90451fc33f2d7da85a667845cf8b7c245557c31413b625930a35",
  });

  const stream = await together.chat.completions.create({
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  stream.choices[0].message.content.split(" ").forEach(async(chunk, index)=>{
    if (chunk && chunk.length > 0) {
      const newContent = `${chunk} `;
      console.log(newContent);
      io.to(getReceiverSocketId(req.session.passport.user.user._id)).emit(
        "token",
        newContent
      );
      message += newContent;
      console.log(newContent);
    }
  })

  const chatbotConversation = new Chatbot({
    userId: req.session.passport.user.user._id,
    prompt: prompt,
    response: message,
  });

  await chatbotConversation.save();

  return res.status(200).json({ response: message });
};
