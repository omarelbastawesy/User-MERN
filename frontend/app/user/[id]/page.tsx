"use client";

import Container from "../../_components/common/Container";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Calendar,
  Clock,
  Edit2,
  Mail,
  MapPin,
  Phone,
  Shield,
  Trash2,
  Wallet,
} from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { formatDate } from "@/lib/utlis/formatDate";
import { useDeleteUser, useUser, useUpdateUser } from "@/hooks/useUser";
import { use, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Popup from "@/app/_components/common/Pupup";

const infoCardClassName =
  "rounded-xl border border-white/10 bg-[#1b2129] p-4 shadow-md shadow-black/20 h-fit";

export default function UserPage({ params }: { params: any }) {
  const userId = use(params as Promise<{ id: string }>);
  const { id } = userId;
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const { data: user, isLoading } = useUser(id);

  const updatedDate = formatDate(new Date(user?.updatedAt));
  const createdDate = formatDate(new Date(user?.createdAt));

  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      router.push("/");
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

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    notFound();
  }

  return (
    <>
      <Popup
        user={user}
        onSubmit={onSubmit}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      <div className="py-10">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="group flex h-10 w-fit items-center gap-2 rounded-md border border-white/10 bg-[#171b21] py-2 pl-3 pr-5 text-sm font-medium text-gray-200 shadow-md shadow-black/20 transition hover:border-sky-400/20 hover:bg-[#1c2128]"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-500/10 text-sky-200 transition-transform group-hover:-translate-x-1">
                <ArrowLeft size={16} />
              </div>
              Back to Workspace
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPopupOpen(true)}
                className="flex h-10 items-center justify-center gap-2 rounded-md border border-sky-400/20 bg-sky-500/10 px-4 text-sm font-medium text-sky-200 shadow-md shadow-black/20 transition hover:bg-sky-500/20"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex h-10 items-center justify-center gap-2 rounded-md border border-red-400/20 bg-[#171b21] px-4 text-sm font-medium text-red-300 shadow-md shadow-black/20 transition hover:bg-red-500/10"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-[#171b21] p-6 shadow-xl shadow-black/25 md:p-8">
              <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <span className="rounded-md bg-sky-500/10 px-4 py-1.5 font-medium text-sky-200">
                  Contact User
                </span>
                <span className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-1.5">
                  <Calendar size={14} className="opacity-70" />
                  Created {createdDate}
                </span>
                <span className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-1.5">
                  <Clock size={14} className="opacity-70" />
                  Updated {updatedDate}
                </span>
              </div>

              <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-6">
                Overview
              </p>

              <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                  <div className="relative h-[171px] w-[171px] shrink-0 overflow-hidden rounded-2xl border-2 border-white/10 bg-[#1b2129] shadow-inner">
                    {user.image !== "" ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <p className="text-2xl font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {user.name}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                      <span className="flex items-center gap-1.5 text-sm font-medium text-sky-400">
                        <Shield size={14} />
                        {user.role}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-white/20 hidden sm:block"></span>
                      <span className="text-sm text-gray-400">
                        {user.jobTitle}
                      </span>
                    </div>
                    <p  className="whitespace-pre-wrap mt-4 max-w-2xl text-sm leading-7 text-gray-300 border-2 border-white/10 p-2 rounded-md">
                      {readMore ? user.description : user.description.substring(0, 100) + "..."}
                      <button onClick={() => setReadMore(!readMore)} className="text-sky-400 hover:text-sky-300 ml-2 cursor-pointer">{readMore ? "Read Less" : "Read More"}</button>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className={infoCardClassName}>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-200/70">
                      <Mail size={14} />
                      Email Address
                    </div>
                    <p className="break-all text-sm font-medium text-gray-200">
                      {user.email}
                    </p>
                  </div>

                  <div className={infoCardClassName}>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-200/70">
                      <Phone size={14} />
                      Phone Number
                    </div>
                    <p className="text-sm font-medium text-gray-200">
                      {user.phone}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className={infoCardClassName}>
                <div className="mb-2 flex items-center gap-2 text-sm text-sky-200">
                  <Shield size={16} />
                  Role
                </div>
                <p className="text-base font-medium text-white">{user.role}</p>
              </div>

              <div className={infoCardClassName}>
                <div className="mb-2 flex items-center gap-2 text-sm text-sky-200">
                  <BriefcaseBusiness size={16} />
                  Job Title
                </div>
                <p className="text-base font-medium text-white">
                  {user.jobTitle}
                </p>
              </div>

              <div className={infoCardClassName}>
                <div className="mb-2 flex items-center gap-2 text-sm text-sky-200">
                  <Wallet size={16} />
                  Salary
                </div>
                <p className="text-base font-medium text-white">
                  {user.salary}
                </p>
              </div>

              <div className={infoCardClassName}>
                <div className="mb-2 flex items-center gap-2 text-sm text-sky-200">
                  <MapPin size={16} />
                  Address
                </div>
                <p className="text-base font-medium text-white">
                  {user.address}
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#171b21] p-6 shadow-xl shadow-black/25">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-gray-500">
                    Full Description
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    User summary
                  </h2>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#1b2129] p-5">
                <p className="whitespace-pre-wrap text-base leading-8 text-gray-300">
                  {user.description}
                </p>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </>
  );
}
