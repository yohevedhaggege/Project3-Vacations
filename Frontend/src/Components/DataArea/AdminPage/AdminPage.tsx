import AddVacation from "../AddVacation/AddVacation";
import "./AdminPage.css";
import FollowersGraph from "../GraphAndCsv/GraphAndCsv";

function AdminPage(): JSX.Element {

    return (
        <div className="AdminPage">

            <AddVacation />
            <hr />
            <FollowersGraph />
            <hr />

        </div>
    );
}

export default AdminPage;

