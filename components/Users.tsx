"use client";
import React, { useEffect, useState } from "react";
import { User } from "../types/types";
export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.slice(0, 10));
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="recentUsers_section w-full bg-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user.user_id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{user.username}</p>
            <p className="text-gray-600">{user.email}</p>
            {/* Add more user information as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
