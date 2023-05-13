import axios from "axios";

export default axios.create({
    baseURL: "https://www.benporayko.com/api/v1/portfolio",
    headers: {
        "Content-type": "multipart/form-data",
        // set this for each request, this was causing issues
        // "x-access-token": localStorage.getItem("token")
    }
});