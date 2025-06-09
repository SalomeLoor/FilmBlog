import { useIonRouter } from "@ionic/react";
/*import { useEffect, useState } from "react";
import { IDataUser } from "../Interface/IUser";

export function useAuth() {
    const router = useIonRouter();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<IDataUser | null>(null);

    // Función para cargar el estado desde localStorage  
    const loadAuth = () => {
        const getToken = localStorage.getItem("token");
        const getUser = localStorage.getItem("user");

        setToken(getToken);
        setUser(getUser ? JSON.parse(getUser) : null);
    };

    useEffect(() => {
        // Carga inicial
        loadAuth();
        // Escucha cambios en localStorage hechos desde otros tabs/ventanas
        window.addEventListener("storage", loadAuth);
        return () => {
            window.removeEventListener("storage", loadAuth);
        };

    }, []);

    const logout = () => {
        // Remover datos de localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Forzar actualizar el estado con un evento storage
        window.dispatchEvent(new Event("storage"));
        // Actualizar el estado

        router.push("/register", "root")
    }


    return {
        isLoggedIn: !!token,
        user,
        token,
        logout
    }

}*/

export function useAuth() {
    const logout = () => {
        // Remover datos de localStorage
       localStorage.clear();        
        window.location.href = "/login"
    }
    return logout;
}