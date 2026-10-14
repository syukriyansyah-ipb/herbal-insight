import { LuLayoutDashboard } from "react-icons/lu";
import ManageCard from "./ManageCard";
import Banner from "./Banner";
function Dashboard() {
  return (
    <div>
      <div className="flex items-center text-2xl md:text-3xl font-bold py-5 text-gray-900">
        <LuLayoutDashboard className="mr-2" />
        <h1 className="h1">Dashboard</h1>
      </div>
      <Banner />
      <ManageCard />
    </div>
  );
}

export default Dashboard;
