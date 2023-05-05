import { useState } from "react";

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card mt-4">
                        <div className="card-title">
                            <h1>Login</h1>
                        </div>
                        <div className="card-body">
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