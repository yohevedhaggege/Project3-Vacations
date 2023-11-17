import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user));
        return unsubscribe;
    }, []);

    function logoutMe(): void {
        authService.logout();
        notifyService.success("Bye Bye...");
        navigate("/login")

    }

    return (
        <div className="AuthMenu">

            {!user &&
                <div>
                    <span>Hello Guest | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </div>
            }

            {user &&
                <div>
                    <span>Hello {user.firstName} {user.lastName} | </span>
                    <NavLink to="/login" onClick={logoutMe}>Logout</NavLink>
                </div>
            }

        </div>
    );
}

export default AuthMenu;
