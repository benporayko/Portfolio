import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import BlogDataService from '../services/blogService';
import { retrievePosts } from "../services/blogPostUtils";

import "../css/blogpage.css"
import "../css/globalstyles.css"
import { Link, useNavigate } from "react-router-dom";
import HeroImage from "./HeroImage";
import NavBar from "./NavBar";

const BlogPage = props => {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [newestPost, setNewestPost] = useState([]);
    const [sortedTags, setSortedTags] = useState([]);

    const navigate = useNavigate();

    let tagCount = 0;

    useEffect(() => {
        const fetchData = async () => {
            const filteredArray = await retrievePosts();
            console.log(filteredArray);
            setListOfPosts(filteredArray);
            // keeps a list of all posts to refer to in case listOfPosts has been filtered
            setAllPosts(filteredArray);
            setNewestPost(filteredArray[0]);
            populateTags(filteredArray);
        }
        fetchData();
    }, []);

    // page does not immediately update with editted info
    // let i = 0;
    const refreshPage = () => {
        navigate(0);
    }

    const clickHandler = (clicked) => {
        setNewestPost(clicked);
    }

    const tagButtonHandler = (event) => {
        const selectedTag = event.target.value;
        const tempArray = []
        
        if (selectedTag == "all") {
            setListOfPosts(allPosts);
        } 
        else {
            // finds posts that have tags matching the pressed tag button
            allPosts.forEach(post => {
                post.tags.forEach(tag => {
                    if (tag.toLowerCase().includes(selectedTag.toLowerCase())) {
                        tempArray.push(post);
                    }
                });
            });
            setListOfPosts(tempArray);
        }

    }

    const populateTags = (posts) => {
        // populate the tags with the most used tags
        // for each array of tags per object in the array allPosts,
        // add each individual tag to a new array with a count of 1
        // if tag repeats, increment the counter
        // sort the array with the most popular tags at the beginning
        const tagCounters = {};

        console.log(posts)

        posts.forEach(post => {
            post.tags.forEach(tag => {
                const lowerCaseTag = tag.toLowerCase();

                if (lowerCaseTag in tagCounters) {
                    tagCounters[lowerCaseTag]++;
                } else {
                    tagCounters[lowerCaseTag] = 1;
                }
            });
        });

        const tagList = Object.keys(tagCounters).map(tag => {
            return { name: tag, count: tagCounters[tag] };
        });

        let sortedTagList = tagList.sort(
            function compare(a, b) {
                return b.count - a.count;
            }
        )

        setSortedTags(sortedTagList);
    }

    return (
        <div className="container-fluid">
            <NavBar></NavBar>
            <div className="container-xxl mt-3">
                <div className="row">
                    <div className="col mb-3 text-end">
                        <h4 className ="title-text-secondary" style={{display: "inline", textAlign: "center"}}>Filter by Tag: </h4>
                        <button className="btn btn-primary ms-1 mt-1" value="all" onClick={tagButtonHandler}>All</button>
                        {
                            sortedTags.map((x, index) => {
                                if (tagCount < 4) {
                                    console.log(tagCount);
                                    tagCount++;
                                    return <button className="btn btn-primary ms-1 mt-1" value={x.name} onClick={tagButtonHandler}>{x.name}</button>
                                }
                            })
                        }
                        {/* <button className="btn btn-primary ms-1" value="retro" onClick={tagButtonHandler}>Retro</button>
                        <button className="btn btn-primary ms-1" value="jrpg" onClick={tagButtonHandler}>JRPG</button> */}
                    </div>
                </div>
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
                                <h3 className="card-subtitle mb-2 mt-2 text-body-secondary">{newestPost.subtitle}</h3>
                            </div>
                            
                            <p className="card-text blog-body-text">{newestPost.body}</p>
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
        </div>
        
    )
}

export default BlogPage;