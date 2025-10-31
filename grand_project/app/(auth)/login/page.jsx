"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles, WandSparkles } from "lucide-react";

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
    <section className="p-6 w-full flex justify-center items-center h-screen bg-black">
      <div className="w-full lg:w-4/12 flex flex-col justify-center items-start p-6 gap-8 border-2 border-gray-700 rounded-3xl bg-gray-900">
        <div>
          <h2 className="text-2xl font-bold text-white">Magic Link</h2>
          <h3 className="text-xs">
            Enter your email and we'll send you a secure login link
          </h3>
        </div>
        <form
          className="w-full flex flex-col justify-center gap-4 "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <Label className="text-white font-semibold text-xs" htmlFor="email">
              Email Address
            </Label>
            <Input
              className="w-full"
              type="email"
              placeholder="abc@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            className="w-full bg-linear-to-r from-blue-700 to-purple-600 text-white"
            type="submit"
          >
            <WandSparkles className="w-4 h-4 mr-1" /> Send Magic Link
          </Button>
          {message && <p className="mt-4">{message}</p>}
        </form>
        <Card className="w-full bg-gray-800 border-2 border-gray-700 text-xs">
          <CardHeader>
            <h3 className="font-semibold text-sm flex items-center">
              {" "}
              <Sparkles className="w-4 h-4 mr-2" /> What is a Magic Link?
            </h3>
          </CardHeader>
          <CardContent>
            A magic link is a secure and convenient way to log in without a
            password. Simply enter your email, and we'll send you a link to
            access your account.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
