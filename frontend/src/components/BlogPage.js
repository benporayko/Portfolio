import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import BlogDataService from '../services/blogService';

import "../css/blogpage.css"
import { Link, useNavigate } from "react-router-dom";
import HeroImage from "./HeroImage";

const BlogPage = props => {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [newestPost, setNewestPost] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        retrievePosts()
    }, []);

    // page does not immediately update with editted info
    // let i = 0;
    const refreshPage = () => {
        navigate(0);
    }

    const clickHandler = (clicked) => {
        setNewestPost(clicked);
    }

    const retrievePosts = () => {
        BlogDataService.getAll().then(response => {
            // sorts array by date, with newest blog post being at index 0
            // reverse by swapping dateB and dateA in the return statement
            let sortedArray = response.data.blog_posts.sort(
                function compare(a, b) {
                    let dateA = new Date(a.date);
                    let dateB = new Date(b.date);
                    return dateB - dateA;
                }
            )
            // console.log(sortedArray[0]);
            setListOfPosts(sortedArray);
            setNewestPost(sortedArray[0]);
        })
    }

    return (
        <div className="container-xxl mt-3">
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    <h1 className="card-title">{newestPost.title}</h1>
                                </div>
                                <div className="col-4">
                                    <h5 className="card-subtitle text-end">By: {newestPost.author}</h5>
                                    <h5 className="card-subtitle text-end">{dayjs(newestPost.date).format('YYYY-MM-DD')}</h5>
                                </div>
                                <div>
                                    {newestPost.publicUrl != null && <HeroImage newestPost={newestPost}></HeroImage>}
                                </div>
                                <h3 className="card-subtitle mb-2 text-body-secondary">{newestPost.subtitle}</h3>
                            </div>
                            
                            <p className="card-text">{newestPost.body}</p>
                            <Link to={"/edit/?" + newestPost._id}>
                                <button type="button" className="btn btn-primary">Edit Post</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    {
                    listOfPosts.map((x, index) => {
                        if (x.published == true) {
                            // add pagination functionality so page isn't too long
                            return (<div className="card mb-2 side-cards" onClick={function() {clickHandler(x)}}>
                            <div className="card-body">
                                <h4 className="card-title">{x.title}</h4>
                                <div className="card-subtitle">{
                                    x.tags.map((element, index) => {
                                        // formats tags that are displayed, places "Tags: " before and commas after each word aside from the last
                                        return(<div style={{display: "inline"}}>{index == 0 ? "Tags: " : ""}{element}{index != x.tags.length - 1 ? ", " : ""}</div>)
                                    })
                                }</div>
                                <h5 className="card-subtitle text-end">{dayjs(x.date).format('YYYY-MM-DD')}</h5>
                                <h5 className="card-text">{x.subtitle}</h5>
                            </div>
                        </div>)
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default BlogPage;