import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import FilterBar from "../filter/FilterBar";

export default function Header({ onToggleSidebar }) {
  const [query, setQuery] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/results?search_query=${encodeURIComponent(q)}`);
    setMobileSearch(false);
  };

  /* ───── small inline SVGs (no extra deps) ───── */
  const Icon = {
    menu: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path
          d="M3 6h18M3 12h18M3 18h18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    search: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="m20 20-3.5-3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    mic: (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <rect
          x="9"
          y="4"
          width="6"
          height="10"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M5 11v1a7 7 0 0 0 14 0v-1M12 21v-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    video: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path
          d="M15 10l4.553-2.276A1 1 0 0 1 22 8.618v6.764a1 1 0 0 1-2.447.894L15 14V10z"
          fill="currentColor"
        />
        <rect
          x="2"
          y="6"
          width="13"
          height="12"
          rx="2"
          ry="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    bell: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V4a2 2 0 1 0-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 1 1-6 0h6z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  };

  return (
    <header className="sticky top-0 z-40 px-2 md:px-4 bg-white">
      <div>
        <nav className="h-full flex items-center">
          {/* ───────── Left: burger + logo ───────── */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-700 rounded-full hover:bg-slate-100"
            aria-label="Toggle sidebar"
          >
            {Icon.menu}
          </button>

          <Link to="/" className="flex items-center gap-1 ml-1 mr-4">
            <Logo />
          </Link>

          {/* ───────── Center: desktop search ───────── */}
          <form
            onSubmit={submit}
            className="hidden lg:flex flex-1 max-w-[650px]"
          >
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-4 py-1.5 text-sm border border-slate-300 rounded-l-full outline-none placeholder:text-slate-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="w-16 flex items-center justify-center bg-slate-100 border border-l-0 border-slate-300 rounded-r-full hover:bg-slate-200"
              aria-label="Search"
            >
              {Icon.search}
            </button>
          </form>

          {/* Voice search (desktop) */}
          <button
            className="hidden lg:flex ml-2 p-2 text-slate-700 rounded-full bg-slate-100 hover:bg-slate-200"
            aria-label="Voice search"
          >
            {Icon.mic}
          </button>

          {/* ───────── Right: actions ───────── */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            {/* Mobile search icon */}
            <button
              onClick={() => setMobileSearch(true)}
              className="flex lg:hidden p-2 text-slate-700 rounded-full hover:bg-slate-100"
              aria-label="Search"
            >
              {Icon.search}
            </button>

            <button
              className="p-2 text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              aria-label="Create"
            >
              {Icon.video}
            </button>

            <button
              className="relative p-2 text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              aria-label="Notifications"
            >
              {Icon.bell}
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-600 rounded-full" />
            </button>

            {/* Avatar */}
            <Link to={'/channel'}>
              <button className="ml-1 sm:ml-2">
                <img
                  src="https://i.pravatar.cc/32"
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover cursor-pointer"
                />
              </button>
            </Link>
          </div>
        </nav>
        <FilterBar />
      </div>
      {/* ───────── Mobile search overlay ───────── */}
      {mobileSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-4">
          <form onSubmit={submit} className="flex w-full max-w-xl">
            <button
              type="button"
              onClick={() => setMobileSearch(false)}
              className="mr-2 p-2 text-slate-700 rounded-full hover:bg-slate-100"
              aria-label="Back"
            >
              {Icon.menu}
            </button>
            <input
              type="text"
              autoFocus
              className="flex-1 px-4 py-2 text-base border-b border-slate-300 outline-none placeholder:text-slate-400"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 p-2 text-slate-700 rounded-full hover:bg-slate-100"
              aria-label="Search"
            >
              {Icon.search}
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
