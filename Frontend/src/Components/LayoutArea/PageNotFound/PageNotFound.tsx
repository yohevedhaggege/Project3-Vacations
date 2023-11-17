import "./PageNotFound.css";
import PageNotFoundImageSource from "../../../Assets/Images/PageNotFound.jpeg"


function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <br></br>
            <h2>The page you are looking for doesn't exist!</h2>

            <img src={PageNotFoundImageSource} alt="Page Not Found" height="400px" width="600px" />

        </div>
    );
}

export default PageNotFound;
