import React, { useState, useEffect, ReactNode } from "react";

import { IUser } from "@/types/auth";
import {
    getToken,
    removeToken,
    setToken as setSessionToken,
    login as authLogin,
    setUser as setSessionUser,
    register as authRegister,
} from "@/api/auth";
import { getUserMe } from "@/api/user";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(() => getToken());
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (token) {
                try {
                    const res = await getUserMe();
                    setCurrentUser(res.data);
                } catch (err) {
                    console.error("Failed to fetch user:", err);
                    removeToken();
                    setToken(null);
                }
            }
            setLoading(false);
        };

        fetchCurrentUser();
    }, [token]);

    const login = async (email: string, password: string) => {
        const res = await authLogin(email, password);
        setSessionToken(res.token);
        setSessionUser(res.user);
        setToken(res.token);
        // setCurrentUser(res.user);
    };
    const register = async (
        email: string,
        password: string,
        username: string
    ) => {
        const res = await authRegister(email, password, username);
        setSessionToken(res.token);
        setSessionUser(res.user);
        setToken(res.token);
        // setCurrentUser(res.user);
    };

    const logout = () => {
        removeToken();
        setToken(null);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ currentUser, token, loading, login, logout, register }}
        >
            {children}
        </AuthContext.Provider>
    );
};
