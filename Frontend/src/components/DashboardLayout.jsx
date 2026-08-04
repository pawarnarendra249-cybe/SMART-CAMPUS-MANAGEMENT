import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <DashboardHeader />

        <main className="dashboard-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;