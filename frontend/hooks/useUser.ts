"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userSchema } from "@/lib/schema/user";
import z from "zod";

// Fetch Users Data
async function fetchUsers() {
  const res = await fetch("/api/user");

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed fetch users");
  }
  const data = await res.json();
  if (!data || !data.data) {
    throw new Error("Invalid users data structure");
  }
  return data.data;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

// Add User Data
async function addUser(data: z.infer<typeof userSchema>) {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to add user");
  }
  const addedData = await res.json();
  return addedData;
}

export function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Fetch User Data
async function fetchUser(id: string) {
  const res = await fetch(`/api/user/${id}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed fetch user");
  }
  const data = await res.json();
  if (!data || !data.data) {
    throw new Error("Invalid user data structure");
  }
  return data.data;
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });
}

// Update User Data
async function updateUser(data: {
  id: string;
  name: string;
  description: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  jobTitle: string;
  salary: string;
}) {
  const { id, ...bodyData } = data;
  const res = await fetch(`/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to update user");
  }
  const updatedData = await res.json();
  return updatedData;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
}

// Delete User Data
async function deleteUser(id: string) {
  const res = await fetch(`/api/user/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to delete user");
  }
  const deletedData = await res.json();
  return deletedData;
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
