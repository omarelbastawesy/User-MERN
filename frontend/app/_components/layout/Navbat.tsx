"use client";

import Container from "../common/Container";

type NavbarProps = {
  onNewUser: () => void;
};

export default function Navbar({ onNewUser }: NavbarProps) {
  return (
    <header className="navbar sticky top-0 z-50 border-b border-sky-400/10 bg-[#14181d] shadow-md shadow-black/20">
      <Container className="flex min-h-18 items-center justify-between">
        <div className="logo">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
            Workspace
          </p>
          <h1 className="mt-1 text-xl font-bold text-white md:text-3xl">
            Users MERN
          </h1>
        </div>
        <button
          onClick={onNewUser}
          className="btn cursor-pointer rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-950/30 transition hover:bg-sky-600"
        >
          New User
        </button>
      </Container>
    </header>
  );
}
