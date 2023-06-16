import { useParams } from "react-router-dom";
import parseUrlParams from "../../Helpers/parseUrlParams";
import DashboardPage from "../../Pages/DashboardPage";
import DestinationManagement from "../../Pages/DestinationManagement";
import MyPages from "../../Components/MyPages";
import UserManagement from "../../Pages/UserManagement";
import Scanner from "../../Pages/Scanner";

const Dashboard = () => {
  let { 0: routesParams } = useParams();
  return (
    <div className="flex h-screen max-h-screen w-full overflow-hidden">
      <MyPages>
        <Routes route={routesParams} />
      </MyPages>
    </div>
  );
};

function Routes({ route }) {
  let { 0: page } = parseUrlParams(route || "");
  switch (page) {
    case "destination-management":
      return <DestinationManagement />;
    case "user-management":
      return <UserManagement />;
    case "scanner":
      return <Scanner />;

    default:
      return <DashboardPage />;
  }
}

export default Dashboard;
