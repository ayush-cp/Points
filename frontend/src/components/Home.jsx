import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Leaderboard from "./Leaderboard";


const Home = () => {

 
  return (
    <div className="h-full w-full bg-gray-800 flex flex-col">
      <div className="w-full h-max">
        <Navbar />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Leaderboard />
      </div>
    </div>
  );
};

export default Home;
