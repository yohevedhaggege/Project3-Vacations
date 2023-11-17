import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import VacationSource from "../../../Assets/Images/holiday1.jpeg"

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu />
            <img src={VacationSource} alt="vacations" height="150px" width="350px" />
        </div>
    );
}

export default Header;
