import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "@/utils/slices/userSlice";

interface EditProfileProps {
  onClose: () => void;
  user: User;
}

interface User {
  firstName: string;
  lastName: string;
  bio: string;
  profilePic: string;
  age: number;
}

const EditProfile = ({ onClose, user }: EditProfileProps) => {
  const dispatch = useDispatch();

  const { toast } = useToast();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      profilePic: user.profilePic,
      age: user.age,
    },
  });

  const submitUpdatedForm = async (data: User) => {
    const respose = await axios.patch(
      BASE_URL + "editProfile",
      { ...data },
      {
        withCredentials: true,
      }
    );
    if (respose.status === 202) {
      dispatch(removeUser());
      dispatch(addUser(respose.data.loggedInUser));
      toast({
        variant: "default",
        title: "User Updated Successfully",
        action: <ToastAction altText="Okay">Okay !</ToastAction>,
      });
      onClose();
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update user",
        action: <ToastAction altText="Okay">Okay !</ToastAction>,
      });
    }
  };

  return (
    <div>
      <div>
        {user && (
          <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm mx-auto shadow-lg rounded-lg p-6 bg-white">
              <Button onClick={onClose}>Go Back</Button>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-gray-800 mb-4">
                  Edit Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form noValidate onSubmit={handleSubmit(submitUpdatedForm)}>
                  <div className="max-w-sm mx-auto p-6  space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        placeholder="First Name"
                        {...register("firstName")}
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        {...register("lastName")}
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Age
                      </Label>
                      <Input
                        type="number"
                        placeholder="Age"
                        {...register("age")}
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Bio
                      </Label>
                      <Input
                        placeholder="Bio"
                        {...register("bio")}
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ></Input>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">
                        Profile Picture
                      </Label>
                      <Input
                        type="url"
                        placeholder="Profile Picture URL"
                        {...register("profilePic")}
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <Button type="submit" className="w-full py-2 px-4 ">
                      Submit
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
