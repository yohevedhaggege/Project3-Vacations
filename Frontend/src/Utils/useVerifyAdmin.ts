import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

function useVerifyLoggedIn() {

    const navigate = useNavigate();

    useEffect(() => {

        // Get the user's role
        const role = authStore.getState().user.roleId;
        if (role === 2) { // if not admin.
            notifyService.error("You do not have admin privileges to access this page.");
            navigate("/login");
        }

    }, []);


}
export default useVerifyLoggedIn;