import { Route, Routes } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
const HomePage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default HomePage;
