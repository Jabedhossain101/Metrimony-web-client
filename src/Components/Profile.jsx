import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const ProfileCard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center text-sm text-gray-200">
        Please login to view profile
      </div>
    );
  }

  return (
    <div className="bg-blue-700 rounded-xl p-4 text-center mb-6">
      <img
        src={user?.userData?.photoURL}
        alt="Profile"
        className="w-16 h-16 mx-auto rounded-full border-2 border-pink-400"
      />
      <h3 className="mt-2 text-lg font-semibold text-white">
        {user?.userData?.displayName || "Unknown User"}
      </h3>
      <p className="text-sm text-gray-300">{user?.email}</p>
      <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-pink-100 text-pink-600 font-semibold">
        {user?.role ? user?.role.toUpperCase() : "USER"}
      </span>
    </div>
  );
};

export default ProfileCard;
