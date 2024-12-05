import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/feed"
        className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
