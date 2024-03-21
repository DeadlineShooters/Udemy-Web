import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function ManageCourseLayout() {
  return (
    <div>
      <Header />
      <div className="flex px-8 py-5 bg-gray-50">
        <Sidebar />
        <main className="w-full shadow-xl bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
