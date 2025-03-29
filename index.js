const express = require("express");
const validateRequest = require("./validator");
const getGroqChatResponse = require("./groq");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/cardAi", validateRequest, async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
