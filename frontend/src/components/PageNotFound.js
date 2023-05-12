import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return(
        <div className="container-fluid">
            <NavBar></NavBar>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card bg-dark text-white">
                        <div className="card-body">
                            <div className="card-title">
                                <h1 className="title-text title-text-font">Uh Oh! Error 404</h1>
                            </div>
                            <div className="card-text">
                                <h3>We couldn't find the page you were looking for. Click below to return home!</h3>
                                    <div className="col text-center">
                                        <Link to="/" className="icon-link">
                                            <button className="btn btn-primary">Return Home</button>
                                        </Link>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

export default PageNotFound;