"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function users({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      if (data.user) {
        setUser(data.user.id);
      } if (!data.user) {
        router.replace("/login");
      }
  }
    getUser();
  }, []);

  return user ? (
    <section className="flex flex-wrap items-center justify-center min-h-screen w-full">
      {children}
    </section>
  ) : (
    <div
      role="status"
      className="flex items-center justify-center min-h-screen w-full"
    >
      <div id="spinner-container" className="space-y-10">
        <div className="flex justify-center space-x-1">
            <div className="w-4 h-4 bg-blue-400
                        rounded-full animate-bounce">
            </div>
            <div className="w-4 h-4 bg-purple-500/70
                        rounded-full animate-bounce
                        delay-100">
            </div>
            <div className="w-4 h-4 bg-blue-600
                        rounded-full animate-bounce
                        delay-200">
            </div>
        </div>


    </div>
    </div>
  );
}
