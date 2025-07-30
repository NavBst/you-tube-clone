import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import FilterBar from "../filter/FilterBar";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

export default function Header({ onToggleSidebar }) {
  const [query, setQuery] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && 
          !dropdownRef.current.contains(event.target) && 
          !avatarRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/results?search_query=${encodeURIComponent(q)}`);
    setMobileSearch(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
    <header className="sticky top-0 z-40 px-2 md:px-4 bg-white py-2">
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

            {user ? (
              <div className="flex items-center gap-2">
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

                {/* User Avatar with Dropdown */}
                <div className="relative">
                  <button 
                    ref={avatarRef}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="ml-1 sm:ml-2 focus:outline-none"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="h-8 w-8 rounded-full object-cover cursor-pointer border hover:border-blue-500"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium cursor-pointer border hover:border-blue-500">
                        {getInitials(user.username)}
                      </div>
                    )}
                  </button>
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div 
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg py-2 z-50 border"
                  >
                    {/* User Info Section */}
                    <div className="px-4 py-2 border-b">
                      <div className="flex items-center space-x-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                            {getInitials(user.username)}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{user.username}</span>
                          <span className="text-xs text-gray-500">{user.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        to="/channel"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                        Your channel
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"
                    />
                  </svg>
                  <span className="font-medium">Sign in</span>
                </button>
              </Link>
            )}
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
