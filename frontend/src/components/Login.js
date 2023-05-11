import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import BlogDataService from "../services/blogService";

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            BlogDataService.login(formData)
                .then(response => {
                    console.log(response.data);
                    // in future, might be better to validate this on the backend
                    if (response.data.token !== undefined) {
                        localStorage.setItem("token", response.data.token)
                        navigate("/");
                    }
                })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="container-fluid">
            <NavBar></NavBar>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card mt-4">
                        <div className="card-title">
                            <h1>Login</h1>
                        </div>
                        <div className="card-body">
                            <div className="card-text">
                                <p style={{color: "red"}}>Registration functionality is currently not fully implemented. A future version of this website will include an account system with the ability to comment on blog posts.</p>
                            </div>
                            <form onSubmit={submitHandler}>
                                <label htmlFor="userInput">Username:</label>
                                <input className="form-control" type="text" id="userInput" onChange={(event) => setUserName(event.target.value)}></input>
                                <label htmlFor="passwordInput">Password:</label>
                                <input className="form-control" type="password" id="passwordInput" onChange={(event) => setPassword(event.target.value)}></input>
                                <button type="submit" className="btn btn-primary mt-1">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

export default Login;