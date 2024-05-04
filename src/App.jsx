import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainContent from "./pages/MainContent";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, ...rest }) => {
  const user = useSelector((state) => state.user);
  return user.uid ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: rest.location }} />
  );
};

const App = () => {
  return (
    <Router>
      <div className="bg-haiti-950 to-90% min-h-screen w-full overflow-x-hidden text-purple-heart-200 font-sans">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<MainContent />} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
