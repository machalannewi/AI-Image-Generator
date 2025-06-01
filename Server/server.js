import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);

  if (!prompt || prompt.trim().length < 5) {
    return res.status(400).json({ error: "Prompt is too short or empty." });
  }

  try {
    const encodedPrompt = encodeURIComponent(prompt.trim());
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000000)}`;
    
    console.log("Generated image URL:", imageUrl);
    

    res.json({ 
      image: imageUrl,
      message: "Image generated successfully"
    });

  } catch (err) {
    console.error("Error generating image:", err);
    res.status(500).json({ error: "Failed to generate image." });
  }
});


app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.listen(5000, () => console.log("Server started on http://localhost:5000"));