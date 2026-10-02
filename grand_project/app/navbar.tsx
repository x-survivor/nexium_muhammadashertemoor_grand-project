"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Plus } from "lucide-react";

export function Navigation(logo: any) {
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
      },
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
    <header className="bg-black text-gray-100 body-font">
      <Toaster richColors />
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-between gap-4 w-full">
          <div className="flex justify-center items-center gap-2">
            <Link
              href="/"
              className="flex justify-center items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
            >
              <img className="w-32 h-18" src={logo["logo"]} alt="Logo" />
            </Link>
          </div>

          <div className="flex justify-center items-center gap-x-4">
            <nav className="flex justify-center items-center gap-2">
              {/* <Link
                href="/"
                className="flex justify-center items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0,0,256,256"
                >
                  <g fill="currentColor">
                    <g transform="scale(10.66667,10.66667)">
                      <path d="M12,2.09961l-11,9.90039h3v9h7v-6h2v6h7v-9h3zM12,4.79102l6,5.40039v0.80859v8h-3v-6h-6v6h-3v-8.80859z"></path>
                    </g>
                  </g>
                </svg>
              </Link> */}
              <Link
                href="/users"
                className="flex justify-center items-center gap-1 text-gray-300 hover:text-white cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Create Recipe
              </Link>
            </nav>

            <div className="flex justify-center items-center gap-2">
              {user && (
                <Button
                  onClick={handleLogout}
                  className="cursor-pointer inline-flex justify-center items-center text-gray-300 hover:text-black bg-white-0 border border-gray-300 py-1 px-3 rounded text-base mt-4 md:mt-0"
                >
                  Sign Out
                </Button>
              )}
              {!user && (
                <Button
                  onClick={() => {
                    location.href = "/login";
                  }}
                  className="cursor-pointer inline-flex justify-center items-center text-gray-300 hover:text-black bg-white-0 border border-gray-300 py-1 px-3 rounded text-base mt-4 md:mt-0 transition duration-[0.4s] ease-in"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
