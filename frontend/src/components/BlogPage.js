import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { retrievePosts } from "../services/blogPostUtils";

import "../css/blogpage.css"
import "../css/globalstyles.css"
import { Link } from "react-router-dom";
import HeroImage from "./HeroImage";
import NavBar from "./NavBar";
import { AuthContext } from "../context/AuthProvider";

const BlogPage = props => {
    const { role } = useContext(AuthContext);
    const [listOfPosts, setListOfPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [newestPost, setNewestPost] = useState([]);
    const [sortedTags, setSortedTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPostIndex, setCurrentPostIndex] = useState(0);
    const postsPerPage = 5;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = listOfPosts
        .filter((x) => x.published === true)
        .slice(indexOfFirstPost, indexOfLastPost);

    let tagCount = 0;

    useEffect(() => {
        const fetchData = async () => {
            const filteredArray = await retrievePosts();
            setListOfPosts(filteredArray);
            // keeps a list of all posts to refer to in case listOfPosts has been filtered
            setAllPosts(filteredArray);
            setNewestPost(filteredArray[0]);
            populateTags(filteredArray);
        }
        fetchData();
    }, []);

    const clickHandler = (clicked) => {
        setNewestPost(clicked);
        setCurrentPostIndex(allPosts.indexOf(clicked));
    }

    const renderPosts = () => {
        // used to render the side cards
        return currentPosts.map((post, index) => (
            <div key={index} className="card mb-2 side-cards" onClick={function() {clickHandler(post)}}>
                <div className="card-body">
                    <h4 className="card-title">{post.title}</h4>
                        <div className="card-subtitle">{
                            post.tags.map((element, index) => {
                                // formats tags that are displayed, places "Tags: " before and commas after each word aside from the last
                                return(<div key={index} style={{display: "inline"}}>{index === 0 ? "Tags: " : ""}{element}{index !== post.tags.length - 1 ? ", " : ""}</div>)
                            })
                        }</div>
                    <h6 className="card-subtitle text-end">{dayjs(post.date).format('YYYY-MM-DD')}</h6>
                    <h5 className="card-text">{post.subtitle}</h5>
                </div>
            </div>
        ));
    };

    const tagButtonHandler = (event) => {
        const selectedTag = event.target.value;
        const tempArray = []
        
        if (selectedTag === "all") {
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
        setCurrentPage(1);
    }

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    }

    const handlePreviousPost = () => {
        let index = currentPostIndex - 1;
        setNewestPost(allPosts[index]);
        setCurrentPostIndex(index);
    }

    const handleNextPost = () => {
        let index = currentPostIndex + 1;
        setNewestPost(allPosts[index]);
        setCurrentPostIndex(index);
    }

    const populateTags = (posts) => {
        // populate the tags with the most used tags
        // for each array of tags per object in the array allPosts,
        // add each individual tag to a new array with a count of 1
        // if tag repeats, increment the counter
        // sort the array with the most popular tags at the beginning
        const tagCounters = {};

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
                        <div className="d-none d-md-block">
                            <h4 className ="title-text-secondary" style={{display: "inline", textAlign: "center"}}>Filter by Tag: </h4>
                            <button className="btn btn-primary ms-1 mt-1" value="all" onClick={tagButtonHandler}>All</button>
                        
                            {
                                // currently x.name is unique, however it might be safer to assign a unique id to each tag in sortedTags in the future
                                sortedTags.map((x, index) => {
                                    if (tagCount < 4) {
                                        tagCount++;
                                        return <button key={x.name} className="btn btn-primary ms-1 mt-1" value={x.name} onClick={tagButtonHandler}>{x.name}</button>
                                    } else {
                                        return <div key={x.name}></div>
                                    };
                                })
                            }
                        </div>
                    </div>
                </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="row d-md-none">
                        <button className="btn btn-primary col m-2" disabled={currentPostIndex === 0} onClick={handlePreviousPost}>Previous Post</button>
                        <button className="btn btn-primary col m-2" disabled={currentPostIndex === allPosts.length - 1} onClick={handleNextPost}>Next Post</button>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    <h2 className="card-title title-text-font">{newestPost.title}</h2>
                                </div>
                                <div className="col-4">
                                    <h5 className="card-subtitle text-end">By: {newestPost.author}</h5>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-right">
                                <h6 className="card-subtitle text-end mt-1">{dayjs(newestPost.date).format('YYYY-MM-DD')}</h6>
                            </div>
                            <div className="row">
                                {newestPost.publicUrl != null && <HeroImage newestPost={newestPost}></HeroImage>}
                            </div>
                            <h3 className="card-subtitle mb-2 mt-2 text-body-secondary">{newestPost.subtitle}</h3>
                            
                            <p className="card-text blog-body-text">{newestPost.body}</p>
                            {role === 'admin' ? 
                                <Link to={"/edit/?" + newestPost._id}>
                                    <button type="button" className="btn btn-primary">Edit Post</button>
                                </Link>
                                : ""
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-none d-md-block">
                    {(allPosts.length > 5) ?
                        <div className="row">
                            <button className="btn btn-primary col m-2" disabled={currentPage === 1} onClick={handlePreviousPage}>Previous Page</button>
                            <button className="btn btn-primary col m-2" disabled={currentPosts.length < postsPerPage} onClick={handleNextPage}>Next Page</button>
                        </div>
                    : ""}
                    {renderPosts()}
                </div>
            </div>
        </div>
        </div>
        
    )
}

export default BlogPage;