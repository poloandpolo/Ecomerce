import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userPayLoad, setUserPayLoad] = useState(null);
    const [userData, setUserData] = useState(null); // Información adicional del usuario
    const [items, setItems] = useState([]); // Datos de los items

    const login = (jwtToken) => {
        localStorage.setItem('token', jwtToken);
        const payload = jwtDecode(jwtToken);
        setIsAuth(true);
        setUserPayLoad(payload);
    };

    const setUser = (data) => {
        setUserData(data); // Establecer la información del usuario
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
        setUserPayLoad(null);
        setUserData(null); // Limpiar la información del usuario
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get('https://ecommerce-json-jwt.onrender.com/items');
            setItems(response.data || []);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = jwtDecode(token);
            setIsAuth(true);
            setUserPayLoad(payload);
        }
    }, []);

    useEffect(() => {
        fetchItems(); // Fetch items on mount
    }, []);

    const data = {
        isAuth,
        userPayLoad,
        userData, // Información adicional del usuario
        login,
        logout,
        setUser,
        items, // Datos de los items
        fetchItems // Función para obtener los items
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
