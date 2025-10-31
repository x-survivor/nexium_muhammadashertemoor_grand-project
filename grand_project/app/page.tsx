'use client';
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Clock, ChefHat } from "lucide-react";

function createRecipe() {
  location.href = "/users";
}

export default function Home() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-blue-500" />,
      title: "AI-Powered Creation",
      description:
        "Generate unique recipes using advanced AI technology that understands your preferences and dietary needs.",
    },
    {
      icon: <Clock className="w-6 h-6 text-green-500" />,
      title: "Instant Results",
      description:
        "Get personalized recipes in seconds. No more endless scrolling through recipe websites.",
    },
    {
      icon: <ChefHat className="w-6 h-6 text-orange-500" />,
      title: "Professional Quality",
      description:
        "Every recipe includes detailed instructions, nutritional information, and cooking tips.",
    },
  ];

  return (
    <div className="bg-black text-white">
      <section className="px-6 py-20 min-h-[75vh] flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Create Perfect Recipes with AI
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your cooking experience with our AI-powered recipe
            creator. Generate personalized recipes based on your ingredients,
            dietary preferences, and taste profile.
          </p>
          <div onClick={createRecipe} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              Start Creating Recipes
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-center mb-16">Why Choose RecipeAI?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 p-6 hover:bg-gray-800 transition-colors"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6">See RecipeAI in Action</h2>
              <p className="text-xl text-gray-300 mb-8">
                Simply tell us what ingredients you have, your dietary
                preferences, and cooking time, and our AI will create a perfect
                recipe just for you.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Input your available ingredients
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Specify dietary restrictions and preferences
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Get personalized recipes with step-by-step instructions
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-400 mb-2">Input:</p>
                <p className="text-white">
                  "broccoli, and rice. Make something healthy in 30 minutes."
                </p>
              </div>
              <div className="bg-blue-950 rounded-lg p-4">
                <p className="text-sm text-blue-400 mb-2">
                  AI Generated Recipe:
                </p>
                <p className="text-white">
                  Honey Garlic Chicken Stir-fry with Broccoli and Rice
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Cook time: 25 minutes | Serves: 4 | 420 calories
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6">Ready to Transform Your Cooking?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of home cooks who are already creating amazing
            recipes with AI.
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg"
          >
            Start Started
          </Button>
        </div>
      </section>
    </div>
  );
}
