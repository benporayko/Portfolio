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
                                Welcome to my portfolio/blog.
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
                                    <h1 className="card-title title-text-font">
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
                        <div className="col-xs-12 d-flex justify-content-center">
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
                                <div className="row">
                                    <div className="col-xs-12">
                                        <p className="info-text">Thank you for visiting my portfolio website! My name is Ben Porayko, and this website is a programming project I began in March 2023. 
                                            I built this website to have a place I can showcase both my future projects and my writing in a blog format. I am currently searching for work, so my resume is available on this website. Feel free to reach out!
                                        </p>
                                        <p className="info-text">I am a Canadian Software Developer located in the city of Calgary. 
                                            I graduated from the Southern Alberta Institute of Technology with a Diploma in Software Development in 2022.
                                            I am excited to begin a rewarding career as a software developer. Despite being done with school, I am committed to a lifetime of learning. Thankfully, I chose the right field to get into, as software development is a never-ending learning experience!
                                        </p>
                                        <p className="info-text">
                                            I have experience with a variety of programming languages and technologies. I have listed my relevant skills in the "Skills" section further down this page.
                                            In school, my primary focus was learning Java. I have also done plenty of work with JavaScript.
                                        </p>
                                        <p className="info-text">
                                            In addition to programming, I enjoy video games and writing music! I come from a musical background and have a solid grasp of the fundamentals of music theory. I hope to use the blog functionality on this website to explore these topics in writing soon!
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 text-center">
                                        <Link to="https://github.com/benporayko" className="icon-link">
                                            <i className="bi bi-github skill-icon"></i>
                                        </Link>
                                        <h5>GitHub</h5>
                                    </div>
                                    <div className="col-4 text-center">
                                        <Link to="https://www.linkedin.com/in/benporayko/" className="icon-link">
                                            <i className="bi bi-linkedin skill-icon"></i>
                                        </Link>
                                        <h5>LinkedIn</h5>
                                    </div>
                                    <div className="col-4 text-center">
                                        <Link to="https://storage.googleapis.com/ben-porayko/pdf_files/Ben_Porayko_Resume.pdf" className="icon-link">
                                            <i className="bi bi-filetype-pdf skill-icon"></i>
                                        </Link>
                                        <h5>Download Resume</h5>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-2 ml-0"></div>
                        </div>
                </div>
            </div>
            <div className="projects-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 d-flex justify-content-center">
                            <hr></hr>
                        </div>
                    </div>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="card bg-dark text-white p-3">
                                    <div className="card-title">
                                        <div className="col-xs-12 title-text alt-head">
                                            <h1 className="title-text-font">Projects</h1>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-6 mb-2">
                                            <div className="card bg-light text-black h-100 d-flex flex-column mb-1">
                                                <div className="aspect-ratio">
                                                    <img className="card-img-top p-1 " src="https://storage.googleapis.com/ben-porayko/images/project-images/Blog_Project_Screenshot.png" alt="blog-project"></img>
                                                </div>
                                                <div className="card-body">
                                                <div className="card-title">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h3 className="title-text-font pl-1">Portfolio/Blog</h3>
                                                        </div>
                                                        <div className="col text-end">
                                                            <h4>
                                                                <i className="devicon-mongodb-plain colored"></i>
                                                                <i className="devicon-express-original colored"></i>
                                                                <i className="devicon-react-original colored"></i>
                                                                <i className="devicon-nodejs-plain colored"></i>
                                                                <i className="devicon-bootstrap-plain colored"></i>
                                                                <i className="devicon-googlecloud-plain colored"></i>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                </div>
                                                
                                                    <p className="card-text">
                                                    A dynamic website built using the MERN tech stack. Designed as a showcase of my skills and projects as a software developer. Includes a blogging system that allows for the creation of blog posts from within an admin portal. Posts are stored in a MongoDB database and displayed to website visitors. Designed with mobile-responsive in mind so website displays properly on all platforms.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 mb-2">
                                            <div className="card text-black h-100 d-flex flex-column mb-1">
                                                <div className="aspect-ratio">
                                                    <img className="card-img-top p-1" src="https://storage.googleapis.com/ben-porayko/images/project-images/Coming_Soon_Idea.jpg" alt="future-project"></img>
                                                </div>
                                                <div className="card-body">
                                                <div className="card-title">
                                                    <h3 className="title-text-font">Future Projects</h3>
                                                </div>
                                                
                                                    <p className="card-text">
                                                        My future projects will be listed here. I am hoping to explore new programming languages and technologies that I can use to build unique projects. I am always open to ideas, so I encourage you to contact me with any suggestions.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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
                        <div className="col-xs-12 d-flex justify-content-center">
                            <hr></hr>
                        </div>
                    </div>
                    <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="card bg-dark text-white p-3">
                                    <div className="card-title">
                                        <div className="col-xs-12 title-text">
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
                                                <i className="devicon-mongodb-plain colored skill-icon"></i>
                                                <p>MongoDB</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i className="devicon-nodejs-plain colored skill-icon"></i>
                                                <p>Node.js</p>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-6 skill-col">
                                                <i className="devicon-express-original colored skill-icon"></i>
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
            <div className="contact-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 d-flex justify-content-center">
                            <hr></hr>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col d-flex justify-content-center">
                            <Link to="/contact">
                                <button type="button" className="btn btn-primary">Contact Me</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;