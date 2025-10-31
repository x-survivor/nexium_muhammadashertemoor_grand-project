"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Sparkles,
  RefreshCw,
  ChefHat,
  Clock,
  Users,
  Heart,
  Bookmark,
  Share,
  Edit,
  Wand2,
  Plus,
  X,
  AlertCircle,
  Utensils,
  InfoIcon,
} from "lucide-react";

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

export default function GenerateWithAIPage() {
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(
    []
  );
  const [cookTime, setCookTime] = useState("");
  const [servingSize, setServingSize] = useState("4");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<GeneratedRecipe[]>(
    []
  );
  const [selectedRecipe, setSelectedRecipe] = useState<GeneratedRecipe | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("generate");
  const [hasMounted, setHasMounted] = useState(false);

  const dietaryRestrictions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Keto",
    "Paleo",
    "Low-Carb",
    "High-Protein",
    "Low-Sodium",
    "Sugar-Free",
    "Mediterranean",
    "Whole30",
    "Kosher",
    "Halal",
  ];

  const cookTimeOptions = [
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2+ hours" },
  ];

  const servingSizeOptions = [
    { value: "1", label: "1 person" },
    { value: "2", label: "2 people" },
    { value: "4", label: "4 people" },
    { value: "6", label: "6 people" },
    { value: "8", label: "8+ people" },
  ];

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const toggleRestriction = (restriction: string) => {
    setSelectedRestrictions((prev) =>
      prev.includes(restriction)
        ? prev.filter((r) => r !== restriction)
        : [...prev, restriction]
    );
  };

  const canGenerate = () => {
    const hasIngredients = ingredients.some((ing) => ing.trim() !== "");
    const hasCookTime = cookTime !== "";
    return hasIngredients && hasCookTime;
  };

  const generateRecipe = async () => {
    if (!canGenerate()) return;

    setIsGenerating(true);

    // Filter out empty ingredients
    const validIngredients = ingredients.filter((ing) => ing.trim() !== "");
    const selectedTime =
      cookTimeOptions.find((option) => option.value === cookTime)?.label ||
      cookTime;
    const userData = {
      ingredients: validIngredients,
      cookingTime: selectedTime,
      restrictions: selectedRestrictions,
      servingSize: servingSize,
    };
    console.log(JSON.stringify(userData));
    const fetchResponse = await fetch("/api/generateRecipe", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    const generatedRecipe = await fetchResponse.json();
    if (generatedRecipe.error) {
      toast.error(`Error generating recipe: ${generatedRecipe.error}`);
      setIsGenerating(false);
      return;
    }

    // Mock generated recipes based on inputs
    const mockRecipes: GeneratedRecipe[] = [
      {
        id: "1",
        name: `AI-Crafted ${validIngredients[0]} Delight`,
        description: `A perfectly balanced recipe featuring ${validIngredients
          .slice(0, 3)
          .join(", ")} with ${
          selectedRestrictions.length > 0
            ? selectedRestrictions.join(" & ") + " "
            : ""
        }considerations.`,
        cookTime: selectedTime,
        servings: servingSize,
        difficulty:
          parseInt(cookTime) <= 30
            ? "Easy"
            : parseInt(cookTime) <= 60
            ? "Medium"
            : "Hard",
        ingredients: [
          ...validIngredients.map((ing) => `1 cup ${ing.toLowerCase()}`),
          "2 tbsp olive oil",
          "Salt and pepper to taste",
          "1 lemon, juiced",
          "Fresh herbs for garnish",
        ],
        instructions: [
          "Prepare all ingredients by washing and chopping as needed",
          `Cook main ingredients for the appropriate time to fit ${selectedTime}`,
          "Season with salt, pepper, and lemon juice",
          "Combine all ingredients in a large bowl or pan",
          "Cook until tender and flavors are well combined",
          "Garnish with fresh herbs and serve immediately",
        ],
        tags: [...selectedRestrictions, "Quick & Easy", "AI-Generated"],
        confidence: 94,
      },
      {
        id: "2",
        name: `Fusion ${validIngredients[0]} Bowl`,
        description: `An innovative approach to cooking with ${validIngredients[0]} and complementary flavors.`,
        cookTime: selectedTime,
        servings: servingSize,
        difficulty: "Easy",
        ingredients: [
          ...validIngredients
            .slice(0, 4)
            .map((ing) => `Fresh ${ing.toLowerCase()}`),
          "1 tbsp sesame oil",
          "2 cloves garlic, minced",
          "1 tsp ginger, grated",
          "Soy sauce to taste",
          "Green onions for garnish",
        ],
        instructions: [
          "Heat sesame oil in a large pan over medium heat",
          "Add garlic and ginger, sauté for 30 seconds",
          "Add main ingredients and cook according to time constraints",
          "Season with soy sauce and adjust flavors",
          "Serve hot with green onion garnish",
        ],
        tags: [...selectedRestrictions, "Asian-Inspired", "Healthy"],
        confidence: 91,
      },
      {
        id: "3",
        name: `Classic ${validIngredients[0]} Comfort`,
        description: `A traditional approach to ${validIngredients[0]} that's both satisfying and nutritious.`,
        cookTime: selectedTime,
        servings: servingSize,
        difficulty: parseInt(cookTime) <= 30 ? "Easy" : "Medium",
        ingredients: [
          ...validIngredients.map((ing) => `2 cups ${ing.toLowerCase()}`),
          "1 onion, diced",
          "2 tbsp butter or oil",
          "Herbs and spices blend",
          "Vegetable or chicken broth",
          "Fresh parsley for garnish",
        ],
        instructions: [
          "Heat butter in a large pot over medium heat",
          "Sauté onion until translucent, about 5 minutes",
          "Add main ingredients and cook until starting to soften",
          "Add broth and bring to a simmer",
          "Cook for remaining time until tender",
          "Season to taste and garnish with parsley",
        ],
        tags: [...selectedRestrictions, "Comfort Food", "Family-Friendly"],
        confidence: 89,
      },
    ];
    const Recipe: GeneratedRecipe[] = [
      {
        id: generatedRecipe["generatedRecipe"].id,
        name: generatedRecipe["generatedRecipe"].name,
        description: generatedRecipe["generatedRecipe"].description,
        cookTime: generatedRecipe["generatedRecipe"].cookTime,
        servings: generatedRecipe["generatedRecipe"].servings,
        difficulty:
          parseInt(generatedRecipe["generatedRecipe"].cookTime) <= 30
            ? "Easy"
            : parseInt(generatedRecipe["generatedRecipe"].cookTime) <= 60
            ? "Medium"
            : "Hard",
        ingredients: generatedRecipe["generatedRecipe"].ingredients,
        instructions: generatedRecipe["generatedRecipe"].instructions,
        tags: generatedRecipe["generatedRecipe"].tags,
        confidence: generatedRecipe["generatedRecipe"].confidence * 100,
      },
    ];
    console.log(Recipe);

    setGeneratedRecipes(Recipe);
    setSelectedRecipe(Recipe[0]);
    setIsGenerating(false);
    setActiveTab("results");
  };

  const regenerateRecipe = () => {
    generateRecipe();
  };

  // Ensure the component has mounted before rendering
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Prevent SSR mismatch

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Toaster richColors />
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Generate with AI
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Tell us what ingredients you have, any dietary restrictions, and how
            much time you want to spend cooking. Our AI will create personalized
            recipes just for you.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-7xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-gray-800 mb-8">
            <TabsTrigger
              value="generate"
              className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-blue-600 flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Generate Recipe
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-blue-600 flex items-center gap-2"
              disabled={generatedRecipes.length === 0}
            >
              <Sparkles className="w-4 h-4" />
              AI Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Input Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Ingredients Input */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-green-400" />
                      What ingredients do you have?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="bg-blue-900/20 border-blue-800">
                      <InfoIcon className="h-4 w-4 text-blue-400" />
                      <AlertDescription className="text-blue-200">
                        List the main ingredients you want to use. Don't worry
                        about basic seasonings - our AI will add those.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <div className="flex-1">
                            <Input
                              value={ingredient}
                              onChange={(e) =>
                                updateIngredient(index, e.target.value)
                              }
                              placeholder={
                                index === 0
                                  ? "e.g., chicken breast"
                                  : "e.g., bell peppers"
                              }
                              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            />
                          </div>
                          {ingredients.length > 1 && (
                            <Button
                              onClick={() => removeIngredient(index)}
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-red-400 h-10 w-10 p-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={addIngredient}
                      variant="outline"
                      className="w-full bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Ingredient
                    </Button>
                  </CardContent>
                </Card>

                {/* Cook Time & Serving Size */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        Cook Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select value={cookTime} onValueChange={setCookTime}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select cook time" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {cookTimeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-white hover:bg-gray-700"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        Serving Size
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={servingSize}
                        onValueChange={setServingSize}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select serving size" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {servingSizeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-white hover:bg-gray-700"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </div>

                {/* Dietary Restrictions */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-400" />
                      Dietary Restrictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-400 text-sm">
                      Select any dietary restrictions or preferences to ensure
                      your recipe fits your needs.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {dietaryRestrictions.map((restriction) => (
                        <div
                          key={restriction}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={restriction}
                            checked={selectedRestrictions.includes(restriction)}
                            onCheckedChange={() =>
                              toggleRestriction(restriction)
                            }
                            className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <Label
                            htmlFor={restriction}
                            className="text-sm cursor-pointer text-gray-300 hover:text-white"
                          >
                            {restriction}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {selectedRestrictions.length > 0 && (
                      <div className="pt-4 border-t border-gray-700">
                        <p className="text-gray-300 text-sm mb-2">
                          Selected restrictions:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedRestrictions.map((restriction) => (
                            <Badge
                              key={restriction}
                              className="bg-blue-600 text-white border-blue-600"
                            >
                              {restriction}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Generate Button */}
                <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800">
                  <CardContent className="">
                    {isGenerating ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-blue-400 justify-center">
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>AI is cooking up something amazing...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <Button
                          onClick={generateRecipe}
                          disabled={!canGenerate()}
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4"
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Generate My Recipe
                        </Button>

                        {!canGenerate() && (
                          <Alert className="bg-red-900/20 border-red-800">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <AlertDescription className="text-red-200">
                              Please add at least one ingredient and select a
                              cook time to generate recipes.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* AI Assistant Sidebar */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-b from-purple-900/20 to-gray-900 border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      AI Recipe Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm text-gray-300">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p>
                          Our AI analyzes thousands of recipes to create the
                          perfect match for your ingredients.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p>
                          Dietary restrictions are carefully considered to
                          ensure safe and delicious meals.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p>
                          Cook times are optimized to help you create
                          restaurant-quality dishes at home.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Pro Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-gray-400 space-y-2">
                      <p>
                        • Include both proteins and vegetables for balanced
                        meals
                      </p>
                      <p>
                        • Don't list basic seasonings like salt, pepper, or oil
                      </p>
                      <p>
                        • Be honest about your cooking time - our AI will adjust
                        complexity
                      </p>
                      <p>• Multiple dietary restrictions work well together</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-8">
            {generatedRecipes.length > 0 && (
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Recipe List */}
                <div className="lg:col-span-1">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span>Generated Recipes</span>
                        <Button
                          onClick={regenerateRecipe}
                          variant="outline"
                          size="sm"
                          className="bg-transparent border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {generatedRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          onClick={() => setSelectedRecipe(recipe)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                            selectedRecipe?.id === recipe.id
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700"
                          }`}
                        >
                          <h4 className="text-sm mb-1">{recipe.name}</h4>
                          <div className="flex items-center gap-2 text-xs opacity-80">
                            <Clock className="w-3 h-3" />
                            {recipe.cookTime}
                            <Users className="w-3 h-3" />
                            {recipe.servings}
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs">Confidence:</span>
                              <div className="h-1 bg-gray-700 rounded-full flex-1">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${recipe.confidence}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">
                                {recipe.confidence}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Recipe Detail */}
                {selectedRecipe && (
                  <div className="lg:col-span-3">
                    <Card className="bg-gray-900 border-gray-800">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-white text-2xl mb-2">
                              {selectedRecipe.name}
                            </CardTitle>
                            <p className="text-gray-400">
                              {selectedRecipe.description}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-gray-700 text-gray-400 hover:text-red-400"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-gray-700 text-gray-400 hover:text-yellow-400"
                            >
                              <Bookmark className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-gray-700 text-gray-400 hover:text-blue-400"
                            >
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mt-4">
                          <div className="flex items-center gap-1 text-gray-300">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {selectedRecipe.cookTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-300">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">
                              {selectedRecipe.servings} servings
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-300">
                            <ChefHat className="w-4 h-4" />
                            <span className="text-sm">
                              {selectedRecipe.difficulty}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {selectedRecipe.tags.map((tag) => (
                            <Badge
                              key={tag}
                              className="bg-gray-800 text-gray-300 border-gray-700"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-white text-lg mb-3">
                              Ingredients
                            </h3>
                            <ul className="space-y-2">
                              {selectedRecipe.ingredients.map(
                                (ingredient, index) => (
                                  <li
                                    key={index}
                                    className="text-gray-300 flex items-start gap-2"
                                  >
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    {ingredient}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-white text-lg mb-3">
                              Instructions
                            </h3>
                            <ol className="space-y-3">
                              {selectedRecipe.instructions.map(
                                (instruction, index) => (
                                  <li
                                    key={index}
                                    className="text-gray-300 flex gap-3"
                                  >
                                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                      {index + 1}
                                    </span>
                                    {instruction}
                                  </li>
                                )
                              )}
                            </ol>
                          </div>
                        </div>

                        <Separator className="bg-gray-700" />

                        <div className="flex gap-4">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Recipe
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            Save to Collection
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            Start Cooking
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
