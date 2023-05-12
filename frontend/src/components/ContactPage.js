import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const ContactPage = () => {
    return(
        <div className="container-fluid">
            <NavBar></NavBar>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card bg-dark text-white">
                        <div className="card-body">
                            <div className="card-title">
                                <h1 className="title-text title-text-font">Contact Me</h1>
                            </div>
                            <div className="card-text">
                                <h3>I can be contacted via email at bporayko@gmail.com.</h3>
                                <h3>Alternatively, I can be contacted on the following platform(s):</h3>
                                <div className="col text-center">
                                        <Link to="https://www.linkedin.com/in/benporayko/" className="icon-link">
                                            <i className="bi bi-linkedin skill-icon"></i>
                                        </Link>
                                        <h5>LinkedIn</h5>
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

export default ContactPage;