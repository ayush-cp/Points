import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import profile from "../assets/profile.png";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";
import API_ENDPOINT from "../Constants";

const HomePage = ({ timeGroup }) => {
  const [users, setUsers] = useState([]);
  const [userPoints, setUserPoints] = useState("");
  const {user, setUser} = useContext(UserContext)
  useEffect(() => {
    const allUsers = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/api/user/v1/get-users`
        );
        const users = response.data.data;
        setUsers(users);
        console.log(users);
      } catch (error) {
        console.log("Error fetching users ", error);
        throw error;
      }
    };
    allUsers();
  }, []);

  const addPoints = async (username) => {
    try {
      if(!user){
        toast.error("Please login to add points");
        return;
      }
      const response = await axios.patch(
        `${API_ENDPOINT}/api/user/v1/claim-points`,
        {username}
      );
      // const data = response.data.data;
      // setUserPoints(data.username)
      if (user) {
        toast.success(`${response.data.message} for ${user.username}`);
      }
      // console.log("response is ",response);
    } catch (error) {
      console.log("Error occured while adding points, ", error);
      // throw error;
    }
  };

  return (
    <div className="w-full h-full flex flex-col ">
      <div className="w-full h-full  ">
        {users.map((user, index) => {
          return (
            <div
              key={user._id}
              className="w-full h-[70px] bg-slate-100 flex flex-row justify-between items-center px-4 transition-all cursor-pointer hover:bg-slate-200"
              onClick={()=>addPoints(user.username)}
            >
              <div className="flex flex-row items-center gap-1">
                <div className="w-10 h-10">
                  <img src={profile} alt="" className="w-full" />
                </div>

                <div className="flex flex-col text-sm gap-1 font-normal text-gray-800">
                  <span>{user.username}</span>
                  <span className="font-medium">Rank: {index + 1}</span>
                </div>
              </div>

              <span className="text-md text-orange-600">
                Prize: ${user.Points}
              </span>

              <span className="text-md text-green-600">{user.Points}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
