import { createContext, useState } from "react"

const UserContext = createContext(null);

const CurrentUser = ({children})=>{

    const [user, setUser]  = useState(null)

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, CurrentUser};