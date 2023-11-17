import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import Spinner from "../../SharedArea/Spinner/Spinner";
import userAdminService from "../../../Services/UserAdminService";
import notifyService from "../../../Services/NotifyService";
import { VacationsActionType, vacationsStore } from "../../../Redux/VacationState";
import AdminDataCard from "../VacationCards/AdminDataCard/AdminDataCard";
import UserDataCard from "../VacationCards/UserDataCard/UserDataCard";
import { useNavigate } from "react-router-dom";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { Grid } from "@mui/material";
import "./VacationList.css";



function VacationsList(): JSX.Element {

    useVerifyLoggedIn();

    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const currentItems = vacations.slice(indexOfFirstItem, indexOfLastItem);
    const [displayFollowed, setDisplayFollowed] = useState<boolean>(false);
    const [displayOnlyFuture, setDisplayOnlyFuture] = useState<boolean>(false);
    const [displayPresent, setDisplayPresent] = useState<boolean>(false);


    // useEffect performing once - perform once when component is ready for use:
    useEffect(() => {

        const user = authStore.getState().user;
        setUser(user);
        const userId = authStore.getState().user.userId;

        // If userRole is user:
        if (user?.roleId === 2) {
            vacationsStore.dispatch({ type: VacationsActionType.ClearAll, payload: [] });

            // Get all vacations for user:
            userAdminService.getAllVacations(userId)
                .then(vacations => {
                    setVacations(vacations);
                })
                .catch(err => notifyService.error(err));

        }

        // If userRole is admin:
        else {
            vacationsStore.dispatch({ type: VacationsActionType.ClearAll, payload: [] });
            // Get all vacations for admin:
            userAdminService.getAllVacations(userId)
                .then(vacations => setVacations(vacations))
                .catch(err => notifyService.error(err));

        }
    }, [user]);

    useEffect(() => {
        if (user)
            showVacations();
    }, [displayFollowed, displayOnlyFuture, displayPresent, user]);

    //function to filter vacation 
    async function showVacations() {
        try {
            vacationsStore.dispatch({ type: VacationsActionType.ClearAll, payload: [] });

            const vacations = await userAdminService.getAllVacations(user!.userId);


            let filteredVacations = vacations;
            if (displayFollowed) filteredVacations = filteredVacations.filter(v => v.isFollowing);


            if (filteredVacations.length === 0) notifyService.error("Your favorite list is currently empty.");

            if (displayOnlyFuture) {
                const presentDate = new Date();
                filteredVacations = filteredVacations.filter(v => new Date(v.startDate) >= presentDate);
            }

            if (filteredVacations.length === 0) notifyService.error("No upcoming vacations were found.");


            if (displayPresent) {
                const presentDate = new Date();
                filteredVacations = filteredVacations.filter(v => new Date(v.startDate) <= presentDate && new Date(v.endDate) >= presentDate);
            }
            if (filteredVacations.length === 0) notifyService.error("No active vacations were identified");

            setVacations(filteredVacations);

        } catch (err: any) {
            notifyService.error(err);
        }
    }



    return (

        <div className="VacationsList">

            <br></br>
            {/* If we don't have vacations we will see spinner: */}
            {vacations.length === 0 && <Spinner />}

            {/* If is the user display filterVacationCheckBox : */}
            {user?.roleId === 2 && (
                <>
                    <div className="checkboxVacations">
                        <span className="choose">Select one filter or none to view vacations.</span>
                        <br />
                        <div className="FollowedVacations">
                            <label htmlFor="FollowedVacations"> Show favorites vacations </label>
                            <input type="checkbox" id="FollowedVacations"
                                onChange={() => {
                                    // Check if there are favorites
                                    if (vacations.some(v => v.isFollowing)) {
                                        setDisplayFollowed(!displayFollowed);
                                        setDisplayOnlyFuture(false);
                                        setDisplayPresent(false);
                                    } else {
                                        notifyService.error("Your favorite list is currently empty.");
                                    }
                                }}
                                checked={displayFollowed}
                            />
                        </div>
                        <div className="FutureVacations">
                            <br />
                            <label htmlFor="FutureVacations">Show only future vacations</label>
                            <input type="checkbox" id="FutureVacations"
                                onChange={() => {
                                    setDisplayFollowed(false);
                                    setDisplayOnlyFuture(true);
                                    setDisplayPresent(false);
                                }}
                                checked={displayOnlyFuture}
                            />
                        </div>
                        <div className="CurrentVacations">
                            <br />
                            <label htmlFor="CurrentVacations">Show only current vacations</label>
                            <input type="checkbox" id="CurrentVacations"
                                onChange={() => {
                                    setDisplayFollowed(false);
                                    setDisplayOnlyFuture(false);
                                    setDisplayPresent(true);
                                }}
                                checked={displayPresent}
                            />
                        </div>
                        <br />
                        <br />

                        {/* Show vacation cards for the user: */}
                        <div className="UserContainer">
                            <div className="Container">
                                <Grid container spacing={4}>
                                    {currentItems.map((v) => (
                                        <Grid item xs={12} sm={6} md={4} lg={4} key={v.vacationId}>
                                            <div className="UserVacations">
                                                <UserDataCard vacation={v} updateVacations={() => showVacations()} />
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                    </div>


                </>
            )}

            {/* If is an admin: */}
            {user?.roleId === 1 &&
                <>
                    <div className="AdminContainer">

                        <div className="Container">
                            <Grid container spacing={4}>
                                {currentItems.map((v) => (
                                    <Grid item xs={12} sm={6} md={4} lg={4} key={v.vacationId}>
                                        {/* Show vacation cards for the admin: */}
                                        <div className="AdminVacations">
                                            <AdminDataCard vacation={v} />
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </div>
                </>
            }

            {/* Pagination: */}
            <div className="Pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === Math.ceil(vacations.length / itemsPerPage)} >
                    Next
                </button>
                <p>Page {currentPage} of {Math.ceil(vacations.length / itemsPerPage)}</p>
            </div>
        </div>
    );

}

export default VacationsList;