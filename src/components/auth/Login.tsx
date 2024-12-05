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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const { isSubmitting, errors } = formState;
  const [err, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const submitLoginForm = async (data: LoginForm) => {
    try {
      const res = await axios.post(
        BASE_URL + "login",
        { ...data },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data.user));
        navigate("/feed");
      }
    } catch (error: any) {
      setError(error.response?.data.message);
      if (err) {
        toast({
          variant: "destructive",
          title: err,
          action: <ToastAction altText="Try again">Okay !</ToastAction>,
        });
      }
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
                <p className="text-sm text-red-600">{errors.email?.message}</p>
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
                <p className="text-sm text-red-600">
                  {errors.password?.message}
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
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
