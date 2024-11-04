import React, { useContext, useEffect, useState } from "react";
import profile from "../assets/profile.png";
import TestHistory from "./TestHistory";
import axios from "axios";
import { UserContext } from "./UserContext";
import API_ENDPOINT from "../Constants";


const LeaderboardRank = () => {
  const [pointsHisory, setPointsHistory] = useState(false);
  const [users, setUsers] = useState([]);
  const [dailyHistory, setDailyHistory] = useState(null);
  const {user, setUser} = useContext(UserContext)
  const [userHistory, setUserHistory] = useState("");
  const [timeActive, setTimeActive] = useState("daily");

  

  useEffect(() => {
    const getTimeData = async () => {
      try {
        // console.log("Fetching user data based on timeActive");
  
        const response = await axios.get(
          `${API_ENDPOINT}/api/user/v1/your-${timeActive}-history`
        );
        const data = response.data.data;
        
        const sortedUsers = data.sort((a, b) => {
          const aPoints =
            a.timeActive === "weekly" ? a.totalPoints : a.totalPointsAwarded;
          const bPoints =
            b.timeActive === "weekly" ? b.totalPoints : b.totalPointsAwarded;
          return bPoints - aPoints;
        });
        
        setUsers(sortedUsers);
        
       
        
        // console.log("Sorted user history", sortedUsers);
      } catch (error) {
        console.error("Error fetching users data: ", error);
      }
    };
    
    getTimeData();
  }, [timeActive, user]);  // Add `user` to dependencies if needed
  

  const handleHistoryPopup = (username) => {
    // console.log("inside popup close")
    setUserHistory(username);
    setPointsHistory(true);
  };

  const closeHistoryPopup = () => {
    // console.log("inside popup close")
    setPointsHistory(false);
  };

  return (
    <div className="w-full h-full flex flex-col ">
      <div className="w-full h-max bg-gray-100 flex justify-center">
        <div className="w-max h-max flex flex-row gap-8 py-1">
          <div
            className={`p-[5px] px-4 ${
              timeActive === "daily"
                ? "bg-orange-500 text-gray-100"
                : "bg-white text-gray-800"
            } rounded-2xl  font-bold cursor-pointer`}
            onClick={() => setTimeActive("daily")}
          >
            Daily
          </div>
          <div
            className={`p-[5px] px-4 ${
              timeActive === "weekly"
                ? "bg-orange-500 text-gray-100"
                : "bg-white text-gray-800"
            } rounded-2xl font-bold cursor-pointer`}
            onClick={() => setTimeActive("weekly")}
          >
            Weekly
          </div>
          <div
            className={`p-[5px] px-4 ${
              timeActive === "monthly"
                ? "bg-orange-500 text-gray-100"
                : "bg-white text-gray-800"
            } rounded-2xl font-bold cursor-pointer`}
            onClick={() => setTimeActive("monthly")}
          >
            Monthly
          </div>
        </div>
      </div>
      <div className="w-full h-max flex flex-row justify-around">

        {users && users.length>0
          ? users.slice(0, 3).map((user) => (
              <div
                key={user._id}
                className="flex flex-col cursor-pointer p-4 py-1 rounded-lg transition-all duration-200 hover:bg-red-100"
                onClick={() => handleHistoryPopup(user._id)}
              >
                <span className="text-sm">{user._id}</span>
                <span className="text-sm">{`${
                  timeActive === "weekly"
                    ? user.totalPoints
                    : user.totalPointsAwarded
                }`}</span>
                <span className="text-sm text-orange-600">
                  Prize: $
                  {`${
                    timeActive === "weekly"
                      ? user.totalPoints
                      : user.totalPointsAwarded
                  }`}
                </span>
              </div>
            ))
          : <div className="w-max h-max">No users rewarded</div>}


      </div>

      <div className="w-full h-full  ">
        {users.map((user, index) => {
          return (
            <div
              key={user._id}
              onClick={() => handleHistoryPopup(user._id)}
              className="w-full h-[70px] bg-slate-100 flex flex-row justify-between items-center px-4 transition-all cursor-pointer hover:bg-slate-200"
            >
              <div className="flex flex-row items-center gap-1">
                <div className="w-10 h-10">
                  <img src={profile} alt="" className="w-full" />
                </div>

                <div className="flex flex-col text-sm gap-1 font-normal text-gray-800">
                  <span>{user._id}</span>
                  <span className="font-medium">Rank: {index + 1}</span>
                </div>
              </div>

              <span className="text-md text-orange-600">
                Prize: $
                {`${
                  timeActive === "weekly"
                    ? user.totalPoints
                    : user.totalPointsAwarded
                }`}
              </span>

              <span className="text-md text-green-600">{`${
                timeActive === "weekly"
                  ? user.totalPoints
                  : user.totalPointsAwarded
              }`}</span>
            </div>
          );
        })}
      </div>

      {pointsHisory ? (
        <div className="absolute w-screen h-screen top-0 left-0">
          <TestHistory popup={closeHistoryPopup} userData={userHistory} />
        </div>
      ) : null}
    </div>
  );
};

export default LeaderboardRank;
