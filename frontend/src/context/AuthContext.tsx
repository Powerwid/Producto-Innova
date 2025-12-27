import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    token: string | null;
    user: any | null;
    isLogged: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any | null>(null);

    // Mantener sesión si hay token en localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);

            // Opcional: decodificar datos del usuario
            const payload = JSON.parse(atob(savedToken.split(".")[1]));
            setUser(payload);
        }
    }, []);

    const login = (jwtToken: string) => {
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);

        const payload = JSON.parse(atob(jwtToken.split(".")[1]));
        setUser(payload);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            token,
            user,
            isLogged: !!token,
            login,
            logout
        }
        }>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return context;
}
