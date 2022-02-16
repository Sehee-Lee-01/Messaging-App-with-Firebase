import React from "react";
import { authService } from "fbase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const Navi = useNavigate();
  const onLogOutClick = () => {
    signOut(authService);
    Navi("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
