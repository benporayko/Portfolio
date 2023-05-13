import http from "../http-common";
import axios from "axios";


class BlogDataService {
    getAll() {
        return http.get();
    }
    get(id) {
        return http.get(`/id/${id}`);
    }
    createPost(data) {
        return axios.create({
            baseURL: "https://www.benporayko.com/api/v1/portfolio",
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data"
            }
        }).post("/edit", data);
    }
    updatePost(data) {
        return axios.create({
            baseURL: "https://www.benporayko.com/api/v1/portfolio",
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data"
            }
        }).put("/edit", data);
    }
    deletePost(data) {
        return axios.create({
            baseURL: "https://www.benporayko.com/api/v1/portfolio",
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data"
            }
        }).post("/deletePost", data);
    }
    login(data) {
        return http.post("/login", data);
    }
    isUserAuth(data) {
        return axios.create({
            baseURL: "https://www.benporayko.com/api/v1/portfolio",
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).get("/isUserAuth", data);
    }
}

const dataService = new BlogDataService();

export default dataService;