import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import "./styles.css";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/user.svg";

function Header() {
  const [user] = useAuthState(auth); 
  const navigate = useNavigate();

  function Logout() {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message); 
      });
  }

  return (
    <div className="navbar">
      <p className="logo">Profin</p>
      {user && (
        <div style={{display: "flex", alignItems: "center", gap: "0.7rem"}}>
          <img 
            src={user.photoURL ? user.photoURL : userImg} 
            style={{borderRadius: "50%", height: "1.7rem", width: "1.7rem"}} 
          />
          <p className="logo link" onClick={Logout}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
