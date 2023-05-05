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
                            <h2 className="title-text-secondary title-text-font">My Name Is</h2>
                            <h1 className="title-text title-text-font">Ben Porayko.</h1>
                            <h2 className="title-text-secondary">
                                I'm a forward-thinking Full Stack Software Developer with a keen eye for detail and design.
                                Welcome to my portfolio.
                            </h2>
                        </div>
                        <div className="col-lg-5 align-self-center text-lg-start">
                            <div className="card mb-3">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-6 align-self-center">
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
                                    <h3 className="card-subtitle mt-1 mb-1">
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
                    </div>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="card bg-dark text-white p-3">
                                    <div className="card-title">
                                        <div className="col-xs-12 title-text">
                                            <h1 className="title-text-font">About Me</h1>
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
                            <div className="col-md-2 ml-0"></div>
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
                    <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="card bg-dark text-white p-3">
                                    <div className="card-title">
                                        <div className="col-xs-12 title-text alt-head">
                                            <h1 className="title-text-font">Skills</h1>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">   
                                                <i className="devicon-html5-plain colored skill-icon"></i>
                                                <p>HTML</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col"> 
                                                <i className="devicon-css3-plain colored skill-icon"></i>
                                                <p>CSS</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i className="devicon-javascript-plain colored skill-icon"></i>
                                                <p>JavaScript</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i className="devicon-java-plain colored skill-icon"></i>
                                                <p>Java</p>
                                            </div>
                
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">     
                                                <i className="devicon-react-original colored skill-icon"></i>
                                                <p>React</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col"> 
                                                <i className="devicon-bootstrap-plain colored skill-icon"></i>
                                                <p>Bootstrap</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i className="devicon-spring-plain colored skill-icon"></i>
                                                <p>Spring</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i className="devicon-oracle-original colored skill-icon"></i>
                                                <p>SQL/PLSQL</p>
                                            </div>
                
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">     
                                                <i className="devicon-mysql-plain colored skill-icon"></i>
                                                <p>MySQL</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col"> 
                                                <i className="devicon-git-plain colored skill-icon"></i>
                                                <p>Git</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i className="devicon-xd-plain colored skill-icon"></i>
                                                <p>Adobe Xd</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i className="devicon-vscode-plain colored skill-icon"></i>
                                                <p>VSCode</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i class="devicon-mongodb-plain colored skill-icon"></i>
                                                <p>MongoDB</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i class="devicon-nodejs-plain colored skill-icon"></i>
                                                <p>Node.js</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i class="devicon-express-original colored skill-icon"></i>
                                                <p>Express</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Home;