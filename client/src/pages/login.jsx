import { React, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import axios from "axios";
import AuthContext from "../store/auth-context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = (event) => setUsername(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const inputStyle =
    "text-center border border-gray-400 rounded-sm p-1 w-full my-3 min-h-12 focus:outline-none focus:ring-2 focus:ring-violet-600 font-semibold text-lg";
  const formHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        // check if response is 200
        if (res.status === 200) {
          // navigate to todo
          console.log("Success");
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.username);
          authCtx.login(res.data.token);
          navigate("/todo");
        } else {
          console.log("Unable to Login");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid Credentials");
      });
  };
  return (
    <>
      <div className="w-screen h-screen blob-containter">
        <div className="blob"></div>
        <div className="blob2"></div>
        <div className="flex justify-center items-center h-full w-full">
          <div className="text-center rounded backdrop-blur-sm bg-white/20 px-8 py-4 h-[80%] w-[90%] lg:w-[30%] flex flex-col items-center justify-center">
            <img src={logo} alt="logo" className="w-36 pb-4" />
            <h1 className="font-bold text-2xl mb-4 text-white">
              Login to Your Account
            </h1>
            <form onSubmit={formHandler} className="flex flex-col w-full">
              <input
                className={inputStyle}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={handleUsername}
              />
              <input
                className={inputStyle}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handlePassword}
              />
              <button
                type="submit"
                className="font-bold bg-violet-700 text-white rounded-sm my-3 min-h-12 p-1  hover:bg-violet-800"
              >
                Login
              </button>
            </form>
            <div className="font-semibold text-xl text-white">New User ?</div>
            <button className="font-bold bg-violet-700 text-white rounded-sm my-3 min-h-12 p-1 hover:bg-violet-800 w-full">
              <Link to="/register">
                <p>Register</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
