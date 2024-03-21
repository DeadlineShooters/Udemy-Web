import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        const getUserGoogleAuth = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setIsLogged(true);
            }
            else {
                fetch("http://localhost:5000/auth/login/google/success", {
                    mode: "cors",
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                    },
                })
                .then((response) => {
                    if (response.status === 200) { 
                        return response.json(); 
                    }
                    throw new Error("Authentication has failed");
                })
                .then((resObject) => {
                    setUser(resObject.user);
                    setIsLogged(true);
                    localStorage.setItem('user', JSON.stringify(resObject.user));
                })
                .catch((err) => {
                    console.log("Error:", err);
                });
            };
        };
        getUserGoogleAuth();
    }, [setUser, setIsLogged]);
    const userData = JSON.parse(localStorage.getItem('user'));
    return (
        <AuthContext.Provider value={{ user, userData, isLogged, setUser, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };