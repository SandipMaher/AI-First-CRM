import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar will come here */}

      {/* Header will come here */}

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;