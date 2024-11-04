import React, { useContext, useState } from 'react'
import profile from "../assets/profile.png"
import LeaderboardRank from './LeaderboardRank'
import HomePage from './HomePage'
import { UserContext } from './UserContext'
import { Link } from "react-router-dom";


const Leaderboard = () => {

    const[showProfile, setShowProfile] = useState(false)
    const {user, setUser} = useContext(UserContext)
    const [showLeaderboard, setShowLeaderboard] = useState(false)

    // console.log(user)
  return (
    <div className='w-[45vw] min-w-[380px] h-[85vh] flex flex-col gap-[15px] bg-gray-100'>
        <div className='w-full h-max bg-blue-400 flex flex-row justify-between items-center p-2 px-4 relative'>
            <div className='flex flex-col'>
               
            </div>
            <div className='flex flex-row gap-1 items-center '>
                <span onClick={()=> setShowLeaderboard(!showLeaderboard)} className='text-gray-800 font-semibold text-md transition-all ease-linear rounded-md px-2 hover:text-gray-700 hover:bg-gray-300 cursor-pointer select-none'>{showLeaderboard?"Leaderboard":"Home"}</span>
                <div onClick={()=> setShowProfile(!showProfile)} className='w-10 h-10 rounded-full transition-all cursor-pointer ease-in hover:shadow-lg hover:shadow-gray-500 '>
                    <img src={profile} alt="" className='w-full'/>
                </div>
            </div>
            {showProfile ? (
  <div className="absolute p-4 rounded-md cursor-pointer bg-gray-50 border border-gray-300 min-h-[200px] h-max w-[200px] right-[-20%] top-14 flex flex-col gap-1">
    {user ? (
      <>
        <div className="flex flex-wrap gap-2 font-semibold text-md">
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
        </div>
        <div className="text-wrap w-full font-semibold text-md flex flex-col">
          <span>Email:</span>
          <span className="font-normal break-words">{user.email}</span>    
        </div>
        <div className="font-semibold text-md flex flex-col">
          <span>Username:</span>
          <span className="font-normal break-words">{user.username}</span>
        </div>
        <div className="font-semibold text-md flex flex-col">
          <span>Points:</span>
          <span className="font-normal break-words">{user.Points}</span>
        </div>
      </>
    ) : <div><Link to="/login">Login</Link>  to view your profile</div>}

  </div>
) : null}

        </div>

        
        <div className='w-full h-full bg-slate-100 overflow-auto'>

            {showLeaderboard? <LeaderboardRank/> : <HomePage />}
                
                
        </div>
    </div>
  )
}

export default Leaderboard