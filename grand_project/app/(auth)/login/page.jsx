"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(`Error sending magic link: ${error}`);
    } else {
      setMessage("Check your email for the magic link!");
    }
  };
  return (
    <section className="w-screen flex justify-center items-center h-[100vh] bg-dark">
      <div className="w-1/4 flex justify-center items-center p-4 rounded-2xl">
        <form
          className="w-full flex flex-col justify-center items-center gap-4 p-8 border-2 border-gray-700 rounded-lg"
          onSubmit={handleSubmit}
        >
          <Label
            className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent uppercase"
            htmlFor="email"
          >
            Login
          </Label>
          <Input
            className="w-full"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button className="w-full" type="submit">
            Get The Link
          </Button>
          {message && <p className="mt-4">{message}</p>}
        </form>
      </div>
    </section>
  );
}
