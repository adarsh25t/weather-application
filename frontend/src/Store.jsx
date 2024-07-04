import React, { createContext, useState } from 'react';

// Create the context
export const MyContext = createContext();

// Create the provider component
const MyProvider = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [favorites,setFavorites] = useState([])

    return (
        <MyContext.Provider value={{ login, setLogin,favorites,setFavorites }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;