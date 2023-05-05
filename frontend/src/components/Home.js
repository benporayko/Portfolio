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
            <div className="info-content">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-xs-12">
                            <hr></hr>
                        </div>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="card bg-dark text-white p-3">
                                    <div className="card-title">
                                        <div className="col-xs-12 title-text">
                                            <h1>About Me</h1>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <p className="info-text">Hi there, and welcome to my portfolio website. This website is designed to be a showcase of my work and skills as a software developer.
                                            The website itself is a coding project of my own.
                                        </p>
                                        <p className="info-text">My name is Ben Porayko, and I am a Canadian Software Developer located in the city of Calgary. 
                                            I graduated from the Southern Alberta Institute of Technology with a Diploma in Software Development in 2022.
                                            With a wealth of knowledge under my belt, I am excited to begin a rewarding career as a software developer and experience what the world of tech has to offer.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="skill-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;