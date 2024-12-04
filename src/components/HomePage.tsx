import { Route, Routes } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import { Profile } from "./Profile";
const HomePage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default HomePage;
