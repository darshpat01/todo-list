import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { React, useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleName = (event) => setUsername(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const inputStyle =
    "text-center border border-gray-400 rounded-sm p-1 w-full my-3 min-h-12 focus:outline-none focus:ring-2 focus:ring-violet-600 font-semibold text-lg";
  const formHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        // check if response is 200
        if (res.status === 200) {
          console.log("Success");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.user.username);
          navigate("/todo");
        } else {
          console.log("Unable to Register");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid Details");
      });
  };
  return (
    <>
      <div className="w-screen h-screen blob-containter">
        <div className="blob"></div>
        <div className="blob2"></div>
        <div className="flex justify-center items-center h-full w-full">
          <div className="text-center rounded backdrop-blur-sm bg-white/20 px-8 py-4 h-[80%] w-[30%] flex flex-col items-center justify-center">
            <img src={logo} alt="logo" className="w-36 pb-4" />
            <h1 className="font-bold text-2xl mb-4 text-white">
              Create Your Account
            </h1>
            <form onSubmit={formHandler} className="flex flex-col w-full">
              <input
                className={inputStyle}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={handleName}
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
                className="font-bold bg-violet-700 text-white rounded-sm min-h-12 my-3 p-1 hover:bg-violet-800"
              >
                Register
              </button>
            </form>
            <div className="font-semibold text-xl text-white">
              Existing User ?
            </div>
            <button className="font-bold bg-violet-700 text-white rounded-sm min-h-12 my-3  p-1 hover:bg-violet-800 w-full">
              <Link to="/login">
                <p>Login</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
