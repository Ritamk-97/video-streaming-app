import { useContext, useState } from "react";
import axios from "axios";
import "./login.scss";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const handleClick = async () => {
    try{
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        { email: inputEmail, password: inputPassword },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      setUser(res.data);
      localStorage.setItem("userData",res.data);
      navigate("/");
    } catch(err) {
      console.log(err.response.data);
    }
  };
  return (
    <div className="login">
      <div className="container">
        <div className="form">
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleClick}>
            Sign In
          </button>
          <span>
            New to Netflix ? &nbsp; <Link to="/register"><b>Sign up now.</b></Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
