const express = require("express");
const validateRequest = require("./validator");
const getGroqChatResponse = require("./groq");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/cardAi", validateRequest, async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    if (!data) {
      return res.status(400).json({ error: "Data is required" });
    }
    const result = await getGroqChatResponse(
      data.commander,
      data.filter,
      data.chatCompletion
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
