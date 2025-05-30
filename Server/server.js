import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors(
    { origin: "http://localhost:5174" } // Adjust the origin as needed  
));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);

  if (!prompt || prompt.trim().length < 5) {
    return res.status(400).json({ error: "Prompt is too short or empty." });
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt.trim(),
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    console.log("Generated image URL:", imageUrl);

    res.json({ image: imageUrl });
  } catch (err) {
    console.error("Error generating image:", err);
    res.status(500).json({ error: "Failed to generate image." });
  }
});


app.listen(5000, () => console.log("Server started on http://localhost:5000"));
