const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: "",
});

async function getGroqChatResponse(commander, filter, chatCompletion) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Can you recommand magic the gathering card for my commander? My commander is ${
          commander.name
        }, oracle text is: ${commander.oracle_text}, colors are/is ${
          commander.colors
        }. Please provide the response in the following JSON format: List<Card> list = [{"name": 21, "explanation": "Explanation of why you use this card" }], not a another single word, 15 card, recommended cards colors must be: ${
          filter?.cardColor || commander.colors
        } and can be colorless but not the other colors. Explanation is must be about card text. ${
          filter?.cardType
            ? `Card type must be ${filter.cardType}, cannot be other card types.`
            : ""
        }. ${
          filter?.cardAggresive
            ? `Aggresive type must be ${filter.cardAggresive}, cannot be other aggresive types.`
            : ""
        }
        ${
          chatCompletion
            ? `You have already recommended these cards, do not recommend these cards: ${chatCompletion.join(
                ","
              )}`
            : ""
        }
        `,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
  try {
    if (!response.choices || response.choices.length === 0) {
      console.error("Unexpected API response format:", response);
      return null;
    }
    const rawData = response.choices[0]?.message?.content;
    if (!rawData) {
      console.error("No content in API response");
      return null;
    }
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error parsing API response:", error);
    return null;
  }
}

module.exports = getGroqChatResponse;
