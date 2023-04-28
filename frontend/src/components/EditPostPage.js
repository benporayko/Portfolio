import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import BlogDataService from "../services/blogService";
import { useNavigate } from "react-router-dom";


const EditPost = () => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [postToEdit, setPostToEdit] = useState(null);
    const [published, setPublished] = useState(false);
    const [file, setFile] = useState("");

    // used to redirect after submitting form
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.search != "" || null) {
            const parsed = queryString.extract(window.location.search);
            console.log(parsed);

            BlogDataService.get(parsed)
                .then(response => {
                    // console.log(response.data[0]);
                    setPostToEdit(response.data[0]);
                    setTitle(response.data[0].title);
                    setSubtitle(response.data[0].subtitle);
                    setBody(response.data[0].body);
                    setPublished(response.data[0].published);
                    setTags(response.data[0].tags)
                    // fix
                    console.log((response.data[0].tags));
                })
        }
    }, []);

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    }

    const subtitleChangeHandler = (event) => {
        setSubtitle(event.target.value);
    }

    const bodyChangeHandler = (event) => {
        setBody(event.target.value);
    }

    const tagsChangeHandler = (event) => {
        const tempArray = (event.target.value).split(",");
        console.log(tempArray);
        setTags(tempArray);
    }

    const publishedChangeHandler = (event) => {
        console.log(event.target.checked);
        setPublished(event.target.checked);
    }

    const fileChangeHandler = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    const deletePostHandler = (event) => {
        event.preventDefault();

        if (postToEdit != "" || null) {
            try {
                const formData = new FormData();
                formData.append("id", postToEdit._id);
                console.log(formData);
                BlogDataService.deletePost(formData)
                    .then(response => {
                        console.log(response.data);
                    });
            } catch (e) {
                console.error(e);
            }
        }
        navigate("/blog");
    }

    const submitFormHandler = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        if (postToEdit != null) {
            formData.append("id", postToEdit._id);
        }
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("body", body);
        
        for (var i = 0; i < tags.length; i++) {
            formData.append('tags[]', tags[i]);
        }
        
        formData.append("published", published);
        // author is temporarily hard coded
        formData.append("author", "Ben Porayko");
        formData.append("file", file);
        
        if (postToEdit != null) {
            try {
                BlogDataService.updatePost(formData)
                    .then(response => {
                        console.log(response.data);
                    })
            } catch (e) {
                console.error(e)
            }
        } else {
            try {
                BlogDataService.createPost(formData)
                    .then(response => {
                        console.log(response.data);
                    })
            } catch (e) {
                console.error(e)
            }
        }
        // history.pushState("/");
        navigate("/blog");
    }

    return(
        <div className="container-fluid">
            <form onSubmit={submitFormHandler} encType="multipart/form-data">
                <div className="row">
                    <div className="col-sm-9">
                        <label htmlFor="postTitle" className="form-label">Post Title</label>
                        <input type="text" className="form-control" id="postTitle" value={title} onChange={titleChangeHandler}></input>

                        <label htmlFor="postSubTitle" className="form-label">Post Subtitle</label>
                        <input type="text" className="form-control" id="postSubTitle" value={subtitle} onChange={subtitleChangeHandler}></input>

                        <label htmlFor="postBody" className="form-label">Post Content</label>
                        <textarea className="form-control" id="postBody" rows="3" value={body} onChange={bodyChangeHandler}></textarea>

                        <label htmlFor="postTags" className="form-label">Post Tags, seperate by commas</label>
                        <input type="text" className="form-control" id="postTags" value={tags.toString()} onChange={tagsChangeHandler}></input>

                        <label htmlFor="postImage" className="form-label">Upload a Hero Image</label>
                        <input type="file" className="form-control" id="postImage" onChange={fileChangeHandler}></input> 
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="publishBool" className="form-label">Published?</label>
                        <input type="checkbox" className="form-check-input" id="publishBool" checked={published} onChange={publishedChangeHandler}></input>
                        <br></br>
                        
                        <button type="submit" className="btn btn-primary">
                        {
                            postToEdit !== null || "" ? "Edit Post" : "Submit Post"
                        }
                        </button>
                        {
                            postToEdit !== null || "" ? 
                            <div>
                                <button type="button" className="btn btn-danger" onClick={deletePostHandler}>Delete Post</button>
                            </div> : ""
                        }
                    </div> 
                </div>
            </form>
        </div>
    )
}

export default EditPost;