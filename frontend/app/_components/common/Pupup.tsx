"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ChevronDown, X } from "lucide-react";

import { userSchema } from "@/lib/schema/user";

type PopupProps = {
  user?: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof userSchema>) => void;
};

const getDefaultValues = (user?: any): z.infer<typeof userSchema> => ({
  name: user?.name || "",
  description: user?.description || "",
  email: user?.email || "",
  role: user?.role || "",
  phone: user?.phone || "",
  address: user?.address || "",
  jobTitle: user?.jobTitle || "",
  salary: user?.salary || "",
  image: user?.image || null,
});

const inputClassName =
  "w-full rounded-md border border-white/10 bg-[#0f1318] px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

export default function Popup({ user, isOpen, onClose, onSubmit }: PopupProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: getDefaultValues(user),
  });

  useEffect(() => {
    reset(getDefaultValues(user));
  }, [user, reset]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6"
      onClick={onClose}
    >
      <form
        className="w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto rounded-lg border border-white/10 bg-[#171b21] p-5 shadow-xl shadow-black/35 sm:p-6"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              {user ? "Edit User" : "Create User"}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
              Contact details
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Keep it compact, fill in the essentials.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-sky-500/10 hover:text-sky-200"
          >
            <X />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="user-name"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Name
            </label>
            <input
              id="user-name"
              type="text"
              placeholder="John Carter"
              className={inputClassName}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="user-email"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              id="user-email"
              type="email"
              placeholder="john@email.com"
              className={inputClassName}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="user-role"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Role
            </label>
            <div className="relative group/select">
              <select
                id="user-role"
                className={`${inputClassName} appearance-none bg-[#0f1318] pr-10`}
                {...register("role")}
              >
                <option value="" disabled className="text-gray-500">
                  Select a role
                </option>
                <option value="Admin" className="bg-[#171b21]">
                  Admin
                </option>
                <option value="Manager" className="bg-[#171b21]">
                  Manager
                </option>
                <option value="User" className="bg-[#171b21]">
                  User
                </option>
                <option value="Developer" className="bg-[#171b21]">
                  Developer
                </option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/select:text-sky-500">
                <ChevronDown size={16} />
              </div>
            </div>
            {errors.role && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="user-phone"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Phone
            </label>
            <input
              id="user-phone"
              type="text"
              placeholder="+20 100 000 0000"
              className={inputClassName}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="user-job-title"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Job Title
            </label>
            <input
              id="user-job-title"
              type="text"
              placeholder="Frontend Developer"
              className={inputClassName}
              {...register("jobTitle")}
            />
            {errors.jobTitle && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="user-salary"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Salary
            </label>
            <input
              id="user-salary"
              type="text"
              placeholder="$4,000"
              className={inputClassName}
              {...register("salary")}
            />
            {errors.salary && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.salary.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="user-address"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Address
            </label>
            <input
              id="user-address"
              type="text"
              placeholder="Cairo, Egypt"
              className={inputClassName}
              {...register("address")}
            />
            {errors.address && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="user-image"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Image URL
            </label>
            <input
              id="user-image"
              type="text"
              placeholder="https://images.unsplash.com/photo-1772371... (optional)"
              className={inputClassName}
              {...register("image")}
            />
            {errors.image && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="user-description"
              className="mb-1.5 block text-sm font-medium text-gray-200"
            >
              Description
            </label>
            <textarea
              id="user-description"
              placeholder="Write a short description..."
              rows={3}
              className={`${inputClassName} resize-none`}
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-sky-500/10 hover:text-sky-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-950/30 transition hover:bg-sky-600"
          >
            {user ? "Update User" : "Save User"}
          </button>
        </div>
      </form>
    </div>
  );
}
