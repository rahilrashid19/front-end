import { Route, Routes } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import { Profile } from "./Profile";
import Navbar from "./Navbar";
import Feed from "./Feed";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  );
};

export default HomePage;
