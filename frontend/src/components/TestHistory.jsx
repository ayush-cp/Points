import axios from 'axios';
import React, { useEffect, useState } from 'react'
import API_ENDPOINT from '../Constants';
const TestHistory = ({popup, userData}) => {

    const [userHistory, setUserHistory] = useState([])

    useEffect(() => {
      
    const handleHistoryPopup = async(username) => {
        // console.log("inside popup open")
        // setPointsHistory(true);
        try {
          const response = await axios.post(`${API_ENDPOINT}/api/user/v1/your-history`, {username})
          const data = response.data.data;
          setUserHistory(data)
          console.log("response history ", data)
        } catch (error) {
          console.log( "Error fetching history ", error);
          throw error;      
        }
    
      };
      handleHistoryPopup(userData);
    
      
    }, [])
    
  return (
    
   <div className='h-full w-full bg-[#00000060] flex justify-center items-center absolute'>
     <div className='h-[50vh] w-[25vw] min-w-[250px] bg-slate-100 rounded-md p-4 flex flex-col gap-4'>
        <h2 className='font-semibold text-lg'>Test's History</h2>
        <div className='w-full h-max overflow-auto'>
            {
                userHistory.map((item, index) => (
                    <div key={index} className='w-full h-[50px] flex flex-col justify-start text-sm border-b-[1px] border-gray-300 cursor-pointer'>
                    <span>Date: {item.date}</span>
                    <span>Points Awarded: {item.pointsAwarded}</span>
                </div>
                ))
            }
           
            
        </div>
        <div>
            <button className='p-4 py-[5px] rounded-md font-bold bg-blue-600 text-gray-50 hover:bg-blue-500' onClick={popup}>Close</button>
        </div>
    </div>
   </div>
  )
}

export default TestHistory