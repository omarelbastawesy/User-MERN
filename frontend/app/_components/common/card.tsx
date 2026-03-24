"use client";

import { formatDate } from "@/lib/utlis/formatDate";
import Link from "next/link";
import { useDeleteUser, useUpdateUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import Popup from "./Pupup";
import { useState } from "react";
import Image from "next/image";
import avatar from "@/public/avatar.jpg";

export default function Card({ user }: any) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const createdDate = formatDate(new Date(user.createdAt));

  const updatedDate = formatDate(new Date(user.updatedAt));

  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  const handleDelete = async () => {
    try {
      await deleteUser(user._id);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete user",
      );
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await updateUser({ id: user._id, ...data });
      toast.success("User updated successfully");
      setIsPopupOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user",
      );
    }
  };

  return (
    <>
      <Popup
        user={user}
        onSubmit={onSubmit}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      <div className="card flex-1 min-w-87.5 rounded-xl border border-white/10 bg-[#171b21] p-5 shadow-lg shadow-black/25 transition hover:border-sky-400/20 hover:shadow-xl hover:shadow-black/30">
        <div>
          <div className="mb-4 flex items-start gap-4">
            <div className="avatar h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white/10 bg-white/5">
              {user.image !== "" ? (
                <Image
                  src={user.image || avatar}
                  alt={user.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </p>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <Link
                  href={`/user/${user._id}`}
                  className="cursor-pointer name text-lg font-bold leading-snug text-white hover:text-sky-300 transition-colors"
                >
                  {user.name}
                </Link>
                <div className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-400 whitespace-nowrap shrink-0">
                  {createdDate}
                </div>
              </div>
              <div className="w-fit rounded-md bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-200">
                {user.role || "Employee"}
              </div>
            </div>
          </div>

          <div className="data mb-6">
            <div className="dis line-clamp-3 text-sm leading-6 text-gray-300">
              {user.description}
            </div>
          </div>
        </div>

        <div className="info flex items-center justify-between border-t border-white/10 pt-4 text-sm text-gray-300">
          <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-400">
            <p>Last updated</p>
            <span className="rounded-md bg-white/5 px-3 py-1 text-xs text-gray-400">
              {updatedDate}
            </span>
          </div>
          <div className="actions flex gap-2">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="edit flex h-10 cursor-pointer items-center justify-center rounded-md border border-sky-400/20 bg-sky-500/10 px-4 text-sm font-medium text-sky-200 transition hover:bg-sky-500/20"
              aria-label="Edit"
              title="Edit"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="delete flex h-10 cursor-pointer items-center justify-center rounded-md border border-red-400/20 bg-red-500/10 px-4 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
              aria-label="Delete"
              title="Delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
