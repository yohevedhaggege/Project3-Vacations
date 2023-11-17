import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

function useVerifyLoggedIn() {

    const navigate = useNavigate();

    useEffect(() => {

        // If we don't have token
        if (!authStore.getState()?.token) {
            notifyService.error("You are not logged in! Please login");

            setTimeout(() => {
                // Redirect to the login page after 2 seconds
                navigate("/login");
                window.location.reload();
            }, 2000);
        }

    }, []);

}

export default useVerifyLoggedIn;