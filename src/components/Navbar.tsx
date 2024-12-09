import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/utils/slices/userSlice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState } from "@/utils/store/store";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.user);

  const handleSelectChange = async () => {
    const res = await axios.post(
      BASE_URL + "logout",
      {},
      { withCredentials: true }
    );

    if (res.data) {
      dispatch(removeUser());
      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}

          <div className="flex-shrink-0 space-x-8">
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `text-2xl font-bold ${
                  isActive ? "text-blue-500" : "text-white"
                }`
              }
            >
              👨‍💻 DevTinder
            </NavLink>
            <NavLink
              to="/connections"
              className={({ isActive }) =>
                `text-2xl font-bold ${
                  isActive ? "text-blue-500" : "text-white"
                }`
              }
            >
              Connections
            </NavLink>
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                `text-2xl font-bold ${
                  isActive ? "text-blue-500" : "text-white"
                }`
              }
            >
              Requests
            </NavLink>
          </div>

          {data.user[0] && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-between items-center w-[15%]">
                <span>Welcome, {data.user[0]?.firstName}</span>
                <img
                  src={data.user[0]?.profilePic}
                  alt="profilepic"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSelectChange()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
