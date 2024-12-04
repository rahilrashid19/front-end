import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const Profile = () => {
  const data = useSelector((state: RootState) => state.user);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm mx-auto shadow-lg rounded-lg p-6 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 mb-4">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto p-6">
            <img
              src={data.user[0].profilePic}
              alt="profile-picture"
              className="w-24 h-24 mx-auto rounded-full border-2 border-indigo-500 object-cover mb-4"
            />
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800">
                {data.user[0].firstName + " " + data.user[0].lastName}
              </p>
              <p className="text-gray-600">
                {data.user[0].age + " years old, " + data.user[0].gender}
              </p>
              <p className="text-gray-800 font-semibold mt-3">
                {data.user[0].bio}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
