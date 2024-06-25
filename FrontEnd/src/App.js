import { Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorPage from "./pages/errorpage";
import HomePage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import DetailsWatches from "./pages/viewDetails";
import Profile from "./pages/profile";
import ChangePasswordUser from "./pages/changePassword";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/details/:id" element={<DetailsWatches />} />
      <Route path="/profile/" element={<Profile />} />
      <Route path="/changePassword/" element={<ChangePasswordUser />} />
    </Routes>
  );
}

export default App;
