import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import UserDataCard from "../../DataArea/VacationCards/UserDataCard/UserDataCard";
import VacationList from "../../DataArea/VacationList/VacationList";
import AddVacation from "../../DataArea/AddVacation/AddVacation";
import EditVacation from "../../DataArea/UpdateVacation/UpdateVacation";
import AdminPage from "../../DataArea/AdminPage/AdminPage";
import FollowersGraph from "../../DataArea/GraphAndCsv/GraphAndCsv";

function Routing(): JSX.Element {
    return (
        <Routes>
            {/* Vacation login: */}
            <Route path="/login" element={<Login />} />

            {/* Vacation Register: */}
            <Route path="/register" element={<Register />} />

            {/* Vacation Route: */}
            <Route path="/vacations" element={<VacationList />} />

            {/* Add vacation */}
            <Route path="/vacations/new" element={<AddVacation />} />

            {/* Edit vacation */}
            <Route path="/vacations/update/:vacationId" element={<EditVacation />} />

            {/* Vacation AdminPage: */}
            <Route path="/adminPage" element={<AdminPage />} />

            {/* Followers graph */}
            <Route path="/vacations/graph" element={<FollowersGraph />} />

            {/* Default Route: */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Page Not Found: */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
