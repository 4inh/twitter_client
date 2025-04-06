import { createContext } from "react";
import { AuthContextType } from "@/types/context";

export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    token: null,
    loading: true,
    login: async () => {},
    logout: () => {},
    updateCurrentUser: () => {},
    register: async () => {},
});
