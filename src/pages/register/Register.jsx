import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import axios from "axios";
import "./register.scss";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const emailRef = useRef();
  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  
  const handleFinish = async () => {
    // console.log(email, password, username, profilePic);
    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, profilePic);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} % done for ProfilePic`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/auth/register`,
            { email: email, password: password, username: username, profilePic: downloadURL},
            {
              headers: {
                "content-type": "application/json",
              },
            }
          );
          console.log(res);
        });
      }
    );
    
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <button
            className="signinButton"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        {!email ? (
          <>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="input">
              <input type="email" placeholder="email address" ref={emailRef} />
              <button className="registerButton" onClick={handleStart}>
                Get Started
              </button>
            </div>
          </>
        ) : (
          <>
            <p>Just few more details required...</p>
            <div className="formContainer">
              <div className="form">
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
                <label htmlFor="profilePic">Add Profile Picture</label>
                <input
                  type="file"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  id="profilePic"
                  style={{ display: "none" }}
                />
                <button className="loginButton" onClick={handleFinish}>
                  Sign Up
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
