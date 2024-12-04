import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@radix-ui/react-label";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  bio: string;
  profilePic: string;
};

const SignUp = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState, watch } = useForm<Inputs>();
  const { errors, isSubmitting, isValid } = formState;
  const [formData, setFormData] = useState<Inputs>();

  const navigate = useNavigate();

  watch("profilePic");

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const submitForm = async (data: Inputs) => {
    try {
      setFormData(data);
      const base64Image = await convertToBase64(data.profilePic[0]);
      const res = await axios.post(
        BASE_URL + "signup",
        { ...formData, profilePic: base64Image },
        {
          withCredentials: true,
        }
      );
      if (res?.data?.message === "User saved successfully") {
        toast({
          title: "User Created Successfully",
          action: <ToastAction altText="Try again">Okay !</ToastAction>,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const err = error as {
        response: {
          data: { error: string };
        };
      };

      console.log(err.response);
      if (err.response.data.error.includes("duplicate key error collection")) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "User Already exists",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-lg mx-auto shadow-lg rounded-lg p-6 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 mb-4">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            noValidate
            onSubmit={handleSubmit(submitForm)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </Label>
                <Input
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "First Name is required",
                    },
                  })}
                />
                <p className="text-sm text-red-600">
                  {errors.firstName?.message}
                </p>
              </div>

              <div>
                <Label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </Label>
                <Input
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: false,
                  })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email"
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
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please enter a Strong Password",
                    },
                  })}
                />
                <p className="text-sm text-red-600">
                  {errors.password?.message}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </Label>
                <Input
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Gender"
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Please select a valid gender",
                    },
                  })}
                />
                <p className="text-sm text-red-600">{errors.gender?.message}</p>
              </div>

              <div>
                <Label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </Label>
                <Input
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Age"
                  {...register("age", {
                    required: {
                      value: true,
                      message: "Age should be between 18 to 55 years",
                    },
                  })}
                />
                <p className="text-xs text-red-600">{errors.age?.message}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="profilePic"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Picture
                </Label>
                <Input
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Profile Picture"
                  type="file"
                  {...register("profilePic", {
                    required: false,
                  })}
                />
              </div>

              <div>
                <Label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </Label>
                <Input
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Bio"
                  {...register("bio", {
                    required: false,
                  })}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isSubmitting}
            >
              Submit
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            Already have an account ?
            <span>
              {" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
