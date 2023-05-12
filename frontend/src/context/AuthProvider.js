import { createContext, useEffect, useState } from "react";
import BlogDataService from "../services/blogService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUserName] = useState(null);
    const [role, setRole] = useState(null);
    const [invalidLoginMessage, setInvalidLoginMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BlogDataService.isUserAuth();
                setUserName(response.data.username);
                setRole(response.data.role);
                setIsLoggedIn(response.data.isLoggedIn);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const login = async (formData) => {
            try {
                const response = await BlogDataService.login(formData);
                if (response.data.token !== undefined) {
                    localStorage.setItem('token', response.data.token);
                    setIsLoggedIn(true);
                    setInvalidLoginMessage("");
                    navigate("/");
                } else {
                    setInvalidLoginMessage("Invalid Login");
                }
            } catch (e) {
                console.error(e);
            }
            try {
                const response = await BlogDataService.isUserAuth();
                setUserName(response.data.username);
                setRole(response.data.role);
            } catch (e) {
                console.error(e);
            }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUserName(null);
        setIsLoggedIn(false);
        setRole(null);
    };

    const clearInvalidMessage = () => {
        setInvalidLoginMessage("");
    }

    const authContextValue = {
        isLoggedIn,
        username,
        role,
        invalidLoginMessage,
        clearInvalidMessage,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!isLoading ? (
                // only renders children once loading is complete to prevent issues with state
                children
            ) : (
                <div>Content Is Loading...</div>
            )}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };