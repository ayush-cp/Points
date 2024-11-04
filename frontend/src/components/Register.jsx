import React, { useContext, useState } from "react";
import OpenEye from "../assets/eye.png";
import CloseEye from "../assets/hidden.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import API_ENDPOINT from "../Constants";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside func")
    try {
      const data = {
        username,
        email,
        password,
        firstName,
        lastName,
      };
      const response = await axios.post(
        `${API_ENDPOINT}/api/auth/v1/register`,
        data,
        {
          headers: {},
        }
      );

      console.log("response data", response.data);
      setUser(response.data.data)
      console.log(user);
      
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Error while registering ", error);
      // throw error;
    }
  };

  return (
    <div className="w-full h-full bg-blue-300 flex justify-center items-center">
      <div className="w-[27vw] min-w-[350px] h-max bg-gray-50 flex flex-col p-4 gap-2 shadow-lg shadow-gray-500">
        <h1 className="text-center font-semibold text-[2.5rem] mb-8 text-gray-800">
          Register
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-semibold">
              First Name:
            </label>
            <input
              className="rounded-sm px-[10px] py-[3px] outline-none border-b-2 border-gray-200  transition-all ease-linear focus-within:border-blue-800 hover:bg-gray-50"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-semibold">
              Last Name:
            </label>
            <input
              className="rounded-sm px-[10px] py-[3px] outline-none border-b-2 border-gray-200 transition-all ease-linear focus-within:border-blue-800 hover:bg-gray-50"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-semibold">
              Email:
            </label>
            <input
              className="rounded-sm px-[10px] py-[3px] outline-none border-b-2 border-gray-200 transition-all ease-linear focus-within:border-blue-800 hover:bg-gray-50"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-semibold">
              Username
            </label>
            <input
              className="rounded-sm px-[10px] py-[3px] outline-none border-b-2 border-gray-200 transition-all ease-linear focus-within:border-blue-800 hover:bg-gray-50"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-lg font-semibold">
              Password
            </label>
            <div className="flex flex-row items-center px-1 bg-white hover:bg-gray-50 border-b-2 border-gray-200 transition-all ease-linear focus-within:border-blue-800">
              <input
                className="w-full rounded-sm px-[10px] py-[3px] outline-none  "
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="w-[20px]">
                {showPassword ? (
                  <img
                    src={CloseEye}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <img
                    src={OpenEye}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              className="w-full h-max py-2 bg-blue-600 rounded-md text-lg font-semibold text-gray-100 transition-all ease-in hover:text-gray-50 hover:bg-blue-700"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="w-full h-max flex justify-center">
          <span>
            Already have an account?{" "}
            <Link to="/login">
              <span className="underline font-semibold">Login</span>
            </Link>{" "}
          </span>
        </div>
        {error ? <div>{error}</div> : null}
      </div>
    </div>
  );
};

export default Register;
