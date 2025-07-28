import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const icons = {
  home: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9.75 12 3l9 6.75V20a1 1 0 0 1-1 1h-5.5a.5.5 0 0 1-.5-.5V14a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v6.5a.5.5 0 0 1-.5.5H4a1 1 0 0 1-1-1V9.75Z" />
    </svg>
  ),
  shorts: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.6 2 7 22l9.6-8H20L13.4 2h-2.8Z" />
    </svg>
  ),
  subs: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M10 12.5 15 15l-5 2.5v-5Z" fill="#fff" />
    </svg>
  ),
  library: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M9 4v18" stroke="white" strokeWidth="2" />
    </svg>
  ),
};

export default function Sidebar({ collapsed }) {
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem("yt‑sidebar‑collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const links = [
    { to: "/", label: "Home", icon: icons.home },
    { to: "/shorts", label: "Shorts", icon: icons.shorts },
    { to: "/subscriptions", label: "Subscriptions", icon: icons.subs },
    { to: "/library", label: "Library", icon: icons.library },
  ];

  const Icon = (
    <div style="width: 100%; height: 100%; display: block; fill: currentcolor;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
        aria-hidden="true"
        style="pointer-events: none; display: inherit; width: 100%; height: 100%;"
      >
        <path
          clip-rule="evenodd"
          d="m7.61 15.719.392-.22v-2.24l-.534-.228-.942-.404c-.869-.372-1.4-1.15-1.446-1.974-.047-.823.39-1.642 1.203-2.097h.001L15.13 3.59c1.231-.689 2.785-.27 3.466.833.652 1.058.313 2.452-.879 3.118l-1.327.743-.388.217v2.243l.53.227.942.404c.869.372 1.4 1.15 1.446 1.974.047.823-.39 1.642-1.203 2.097l-.002.001-8.845 4.964-.001.001c-1.231.688-2.784.269-3.465-.834-.652-1.058-.313-2.451.879-3.118l1.327-.742Zm1.993 6.002c-1.905 1.066-4.356.46-5.475-1.355-1.057-1.713-.548-3.89 1.117-5.025a4.14 4.14 0 01.305-.189l1.327-.742-.942-.404a4.055 4.055 0 01-.709-.391c-.963-.666-1.578-1.718-1.644-2.877-.08-1.422.679-2.77 1.968-3.49l8.847-4.966c1.905-1.066 4.356-.46 5.475 1.355 1.057 1.713.548 3.89-1.117 5.025a4.074 4.074 0 01-.305.19l-1.327.742.942.403c.253.109.49.24.709.392.963.666 1.578 1.717 1.644 2.876.08 1.423-.679 2.77-1.968 3.491l-8.847 4.965ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z"
          fill-rule="evenodd"
        ></path>
      </svg>
    </div>
  );

  return (
    <aside
      className={`bg-white border-r border-slate-200 h-full overflow-y-auto transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <nav className="py-2">
        {links.map(({ to, label, icon }) => {
          const active = pathname === to;
          const baseClasses =
            "flex items-center gap-4 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors";

          const activeClasses = active
            ? "bg-slate-100 text-red-600"
            : "text-slate-700";

          return (
            <Link
              key={to}
              to={to}
              className={`${baseClasses} ${activeClasses}`}
            >
              {icon}
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
