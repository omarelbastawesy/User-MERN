"use client";

import { useState } from "react";
import Popup from "../common/Pupup";
import Navbar from "./Navbat";
import { useAddUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { mutateAsync: addUser } = useAddUser();

  const onSubmit = async (data: any) => {
    try {
      await addUser(data);
      setIsPopupOpen(false);
      toast.success("User added successfully");
      setIsPopupOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add user");
    }
  };

  return (
    <>
      <Navbar onNewUser={() => setIsPopupOpen(true)} />
      <Popup
        onSubmit={onSubmit}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      {children}
    </>
  );
}
