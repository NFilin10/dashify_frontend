import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/auth/authenticate", {
                    withCredentials: true,
                });
                setIsAuthenticated(response.data.authenticated);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, [location]);

    return isAuthenticated;
};

export default useAuth;