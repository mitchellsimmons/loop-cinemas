import { createContext, useContext, useState } from 'react';

// --- CONTEXT ---

const UserContext = createContext();

// Custom hook to access global state from descendant components
export const useUserContext = () => useContext(UserContext);

// --- PROVIDER ---

// Authentication context component
const UserProvider = ({ children }) => {
    // user = { id, email, firstName, lastName, joined }
    // setUser to be called after user login
    const [user, setUser] = useState(null);
    // NOTE: It is VERY important to have a seperate state for the accessToken
    // Otherwise our useRefreshToken hook will interfere with components that are using the user state
    const [accessToken, setAccessToken] = useState(null);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                accessToken,
                setAccessToken,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;