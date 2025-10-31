import { NextApiRequest, NextApiResponse } from "next";

interface message {
  messages: {
    role: string;
    content: string;
  }[];
  model: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
   
  const userData  = JSON.parse(req.body);
  const ingredients = userData.ingredients || [];
  const cookTime = userData.cookingTime || "30 minutes";
  const restrictions = userData.restrictions || [];
  const servingSize = userData.servingSize || "3 servings";

  const prompt = `You are a recipe assistant. Respond only with a JSON object that strictly matches this TypeScript interface:

interface GeneratedRecipe {
  id: string;
  name: string;
  description: string;
  cookTime: string;
  servings: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  confidence: number;
}

Now generate a recipe using the following ingredients: ${ingredients
    .map((ing: string) => ing)
    .join(
      ", "
    )}. Keep it within ${cookTime} cook time, for ${servingSize} servings and dietary restrictions ${restrictions
    .map((res: string) => res)
    .join(", ")}, and label difficulty as "medium". Note: you do not need to use all ingredients, but try to use as many as possible.

Return only a valid JSON object. Do not include code blocks, markdown, or any additional explanation.
`;
  async function query(data: message) {
    try{
      const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
    }
    catch (error) {
      console.error("Error in query function:", error);
      throw new Error("Failed to fetch from Hugging Face API");
    }
  }

  query({
    messages: [
      {
        role: "user",
        content: `${prompt}`,
      },
    ],
    model: "zai-org/GLM-4.5",
  })
    .then((response) => {
      console.log("Response from Hugging Face API:", response);
      if(response.error){
        return res.status(500).json({ error: response.error});
      }
      const data = response.choices[0].message.content;

      const jsonStart = data.indexOf("{");
      const jsonEnd = data.lastIndexOf("}") + 1;
      const jsonString = data.slice(jsonStart, jsonEnd);
      const jsonData = JSON.parse(jsonString);
      const InputtedData = {
        ingredients: ingredients,
        cookTime: cookTime,
        restrictions: restrictions,
        servingSize: servingSize,
      }
      const recipe ={
        "userData": InputtedData,
        "generatedRecipe": jsonData
      }
      res.status(200).json(recipe);
    })
    .catch((error) => {
      console.error("Error generating recipe:", error);
      res.status(500).json({ error: "Failed to generate recipe" });
    });
}
