// pages/admin.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient} from "@supabase/auth-helpers-nextjs";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidated, setPasswordValidated] = useState(false);

  const supabase = createClientComponentClient();
  const router = useRouter();


 

  useEffect(() => {
    if (!user) return; // wait until user is loaded

    const checkAdminStatus = async () => {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("UID", user.id)
        .single();

      if (profileError || !profile?.is_admin) {
        setError("You do not have admin privileges.");
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAdminStatus();
  }, [user]);

  const handlePasswordSubmit = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setPasswordValidated(true);
    } else {
      setError("Incorrect admin password.");
    }
  };

  if (loading) return <p className="text-white">Checking access...</p>;
  if (!isAdmin || !passwordValidated)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1 className="text-2xl mb-4">Admin Access</h1>
        <input
          type="password"
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handlePasswordSubmit}
          className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
        >
          Submit
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    );

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h1 className="text-4xl mb-6">Welcome, Admin</h1>
      <p>You now have access to admin tools.</p>
      {/* Add more admin features here */}
    </div>
  );
}