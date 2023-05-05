import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeroImage from "./HeroImage";
import { retrievePosts } from "../services/blogPostUtils";

import "../css/homepage.css";
import "../css/blogpage.css";

import NavBar from "./NavBar";

const Home = () => {

    const [newestPost, setNewestPost] = useState([]);
    const [openingParagraph, setOpeningParagraph] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const filteredArray = await retrievePosts();
            setNewestPost(filteredArray[0]);
            let arr = (filteredArray[0].body).split("\r");
            setOpeningParagraph(arr[0]);
        }
        fetchData();
        // let arr = (newestPost.body).split("\n");
    }, []);

    return (
        <div>
            <div className="title-content">
                <div className="container-fluid">
                    <NavBar></NavBar>
                    <div className="row">
                        <div className="col-lg-7 title-text-col">
                            <h2 className="title-text-secondary">My Name Is</h2>
                            <h1 className="title-text">Ben Porayko</h1>
                            <h2 className="title-text-secondary">I'm a full stack Software Developer.</h2>
                        </div>
                        <div className="col-lg-5 align-self-center text-lg-start">
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
                                        {
                                            openingParagraph + " ..."
                                        }
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <Link to="/blog">
                                        <button type="button" className="btn btn-primary">View Full Post</button>
                                    </Link>
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