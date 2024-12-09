import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import { Profile } from "./Profile";
import Navbar from "./Navbar";
import Feed from "./Feed";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { addUser, removeUser } from "@/utils/slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PageNotFound from "./NotFound";
import Connections from "./Connections";
import Requests from "./Requests";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [err, setErr] = useState("");

  const logout = async () => {
    const data = await axios.post(
      BASE_URL + "/logout",
      {},
      {
        withCredentials: true,
      }
    );
    if (data.data) {
      dispatch(removeUser());
      navigate("/login");
    }
  };
  const getLoggedInUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "viewProfile", {
        withCredentials: true,
      });
      dispatch(addUser(user.data.user));
    } catch (error: any) {
      setErr(error.status);
      if (err) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      logout();
    } else {
      getLoggedInUser();
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default HomePage;
