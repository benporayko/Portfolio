import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeroImage from "./HeroImage";
import { retrievePosts } from "../services/blogPostUtils";

import "../css/blogpage.css"

import NavBar from "./NavBar";

const Home = () => {

    const [newestPost, setNewestPost] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const filteredArray = await retrievePosts();
            setNewestPost(filteredArray[0]);
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className="title-content">
                <div className="container-fluid">
                    <NavBar></NavBar>
                    <div className="row">
                        <div className="col-lg-7">
                            <h2>My Name Is</h2>
                            <h1>Ben Porayko</h1>
                            <h2>I'm a full stack Software Developer.</h2>
                        </div>
                        <div className="col-lg-5">
                            <div className="card mb-3">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-6">
                                            <h5>Latest Blog post</h5>
                                        </div>
                                        <div className="col-6 text-end">
                                            <Link to="/blog">
                                                <button type="button" className="btn btn-primary">View All</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title">
                                        {newestPost.title}
                                    </h1>
                                    <div>
                                        {newestPost.publicUrl != null && <HeroImage newestPost={newestPost}></HeroImage>}
                                    </div>
                                    <h3 className="card-subtitle">
                                        {newestPost.subtitle}
                                    </h3>
                                    <p className="card-text blog-body-text">
                                        {newestPost.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;