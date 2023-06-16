import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import "./index.css";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatePresence } from "framer-motion";
import Logout from "./Pages/Logout";
import Login from "./Pages/Login";
import Dashboard from "./Routes/Dashboard";
import NotFoundPage from "./Pages/NotFoundPage";

function Routing() {
  let location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location.pathname}>
        <Route path="/logout" children={<Logout />} />
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/dashboard/*">
          <Dashboard />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="bg-blue-200 min-h-screen">
        <Routing />
      </div>
    </Router>
  );
}

export default App;
