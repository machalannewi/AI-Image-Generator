import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

const handleGenerate = async () => {
  setLoading(true);
  setImageUrl("");

  try {
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    console.log("Server response:", data);

    if (response.ok) {
      setImageUrl(data.image);
      setPrompt("");
    } else {
      alert(data.error || "Failed to generate image.");
    }
  } catch (error) {
    console.error("Client error:", error);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6">AI Image Generator</h1>
        
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg text-white mb-4 border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a prompt (e.g. A cat playing guitar)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <button
          onClick={handleGenerate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg disabled:opacity-50"
          disabled={!prompt || loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {imageUrl && (
          <div className="mt-6">
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full max-h-96 object-contain mx-auto rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
