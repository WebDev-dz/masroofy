import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const PrivateRoute = () => {
  // const { isSignedIn, isLoaded, userId, sessionId } = useAuth();


  // console.log({userId, isLoaded})
//   if (!isLoaded) {
//     return <div>Loading...</div>; // Show a loader while auth status is loading
//   }

  // if (!isSignedIn) {
  //   return <Navigate to="/login" />;
  // }

  return <Outlet />;
};

export default PrivateRoute;
