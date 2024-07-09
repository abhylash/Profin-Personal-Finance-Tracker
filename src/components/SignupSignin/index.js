import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // Ensure both auth and db are imported correctly
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmpassword", confirmPassword);

    // Authentication the user
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm password don't match.");
        setLoading(false);
      }
    } else {
      toast.error("All fields are Mandatory!");
      setLoading(false);
    }
  }

  async function loginUsingEmail() {
    setLoading(true);
    console.log("email", email);
    console.log("password", password);

    // Authenticate the user
    if (email !== "" && password !== "") {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("user logged in!", user);
        toast.success("Logged in successfully!");
        setLoading(false);
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } catch (error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      }
    } else {
      toast.error("All fields are Mandatory!");
      setLoading(false);
    }
  }

 async function createDoc(user) {
    setLoading(true);
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userData = await getDoc(userRef);

  if (!userData.exists()) {
    try {
        await setDoc(doc(db, "users", user.uid),{
        name: user.displayName ? user.displayName : name,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : "",
        createdAt: new Date(),
      });
      toast.success("Doc created!");
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  } else {
    // toast.error("Doc Already exists");
    setLoading(false);
  }
}
function googleAuth() {
  setLoading(true);
  const provider = new GoogleAuthProvider();

  try {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User>>>", user);
        createDoc(user);
        setLoading(false);
        navigate("/dashboard");
        toast.success("User authenticated!");
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  } catch (e) {
    toast.error(e.message);
    setLoading(false);
  }
}


  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Profin</span>
          </h2>

          <form>
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter your Email"}
            />

            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter your Password"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginUsingEmail}
            />

            <p className="p-login">or</p>
            <Button text={loading ? "Loading..." : "Login using Google"} blue={true} onClick={googleAuth}/>

            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Don't have an account? Click here?
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            SignUp on <span style={{ color: "var(--theme)" }}>Profin</span>
          </h2>

          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Enter your Name"}
            />

            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter your Email"}
            />

            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter your Password"}
            />

            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Enter Confirm Password"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">or</p>

            <Button text={loading ? "Loading..." : "Signup using Google"} blue={true} onClick={googleAuth} />

            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Have an account? Click here?
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
                      