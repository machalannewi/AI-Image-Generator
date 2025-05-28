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

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    res.json({ image: response.data[0].url });
    console.log("Image generated successfully:", response.data[0].url);
  } catch (err) {
    console.error("Error generating image:", err.message);
    res.status(500).json({ error: "Failed to generate image." });
  }
});

app.listen(5000, () => console.log("Server started on http://localhost:5000"));
