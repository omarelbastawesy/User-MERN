"use client";

import Card from "../common/card";
import { useUsers } from "@/hooks/useUser";
import { Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { data, isLoading } = useUsers();

  useEffect(() => {
    setUsers(data);
  }, [data, isLoading]);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-gray-400 font-medium animate-pulse">
            Loading...
          </div>
        </div>
      ) : users?.length > 0 ? (
        <div className="flex flex-wrap gap-4 items-center">
          {users.map((user: any) => (
            <Card key={user._id} user={user} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col flex-1 items-center justify-center py-24 text-center">
          <div className="rounded-full border border-white/10 bg-[#171b21] p-6 mb-5 shadow-lg shadow-black/20">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            No users found
          </h3>
          <p className="text-gray-400 max-w-md">
            It looks like you don't have any users in your system yet. Add a new
            user to get started!
          </p>
        </div>
      )}
    </>
  );
}
