import http from "../http-common";

class BlogDataService {
    getAll() {
        return http.get();
    }
    get(id) {
        return http.get(`/id/${id}`);
    }
    createPost(data) {
        return http.post("/edit", data);
    }
    updatePost(data) {
        return http.put("/edit", data);
    }
    deletePost(data) {
        return http.post("/deletePost", data);
    }
}

export default new BlogDataService();