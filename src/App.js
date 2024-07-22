import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import { useContext } from "react";
import { UserContext } from "./context/userContext";

// const ProtectedRoute = ({ children }) => {
//   const {user} = useContext(UserContext);
//   const navigate = useNavigate();
//   console.log("user pr", user);
//   if (user) return children;
//   else navigate("/login");
// };

const App = () => {
  const { user } = useContext(UserContext);
  console.log("user app", user);
  return (
    <>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />}></Route>
        <Route path="/adminPage" element={<AdminPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {user && (
          <>
            <Route path="/movies" element={<Home type="movies" />}></Route>
            <Route path="/series" element={<Home type="series" />}></Route>
            <Route path="/watch" element={<Watch />}></Route>
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
