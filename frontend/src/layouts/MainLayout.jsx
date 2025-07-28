import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem('yt‑sidebar‑collapsed');
    return stored ? JSON.parse(stored) : false;
  });

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} />

      <section className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setCollapsed((c) => !c)} />
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
