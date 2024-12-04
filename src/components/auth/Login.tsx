import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "@/utils/slices/userSlice";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitLoginForm = async (data: LoginForm) => {
    const res = await axios.post(
      BASE_URL + "login",
      { ...data },
      { withCredentials: true }
    );
    if (res.status === 200) {
      dispatch(addUser(res.data.user));
      navigate("/feed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm mx-auto shadow-lg rounded-lg p-6 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 mb-4">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit(submitLoginForm)}>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  {...register("email", {
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please enter a valid password",
                    },
                  })}
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
