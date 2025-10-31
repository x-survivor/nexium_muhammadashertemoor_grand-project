"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Key, UserLock, Plus } from "lucide-react";

export function Navigation() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    fetchUser();

    // Listen for auth changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully!");
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error signing out: " + error.message);
      } else {
        toast.error("Error signing out");
      }
    }
  };
  return (
    <header className="bg-black text-gray-100 body-font border-b-2 border-gray-900">
      <Toaster richColors />
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-between gap-4 w-full">
          <div className="flex justify-center items-center gap-2">
            <Link
              href="/"
              className="flex justify-center items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
            >
              <h1 className="text-xl font-bold">Recipe Generator</h1>
            </Link>
          </div>

          <div className="flex justify-center items-center gap-4">
            <Link
              href="/"
              className="flex justify-center items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
            >
              Home
            </Link>
            <Link
              href="/users"
              className="flex justify-center items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Create Recipe
            </Link>
          </div>

          <div className="flex justify-center items-center gap-2">
            {user && (
              <Button
                onClick={handleLogout}
                className="cursor-pointer inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                <UserLock className="h-4 w-4" /> Logout
              </Button>
            )}
            {!user && (
              <Button
                onClick={() => {
                  location.href = "/login";
                }}
                className="cursor-pointer inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                <Key className="h-4 w-4" /> Login
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
