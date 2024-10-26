import { useContext, useState } from "react";
import UserContext from "./UserContext";

const ContextProvider = ({ children }) => {
    const [userAuthState, setUserAuthState] = useState(false);
    const [userData, setUserData] = useState([]);
    return (
        <UserContext.Provider value={{userAuthState, setUserAuthState, setUserData, userData}}>
            {children}
        </UserContext.Provider>
    )
}
export default ContextProvider;