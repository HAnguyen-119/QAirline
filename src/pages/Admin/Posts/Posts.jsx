import './Posts.css'
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Posts() {
    const isLightMode = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();

    const [postData, setPostData] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatingPost, setUpdatingPost] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingPost, setDeletingPost] = useState(null);
    const [imgFile, setImgFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await userAPI.getAllPosts();
                const postsWithImages = await Promise.all(
                    posts.map(async (post) => {
                        const imageResponse = await userAPI.getPostImageById(post);
                        const imageUrl = URL.createObjectURL(imageResponse);
                        return { ...post, imageUrl };
                    })
                );
                setPostData(postsWithImages);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [isRefresh]);

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    const date = searchParams.get("date");

    const filteredPost = postData.filter((post) => {
        return (!id || post.id === id)
            && (!type || post.type === type)
            && (!date || post.date === date)
    })

    const clearFilters = () => {
        const idFilter = document.getElementById("id-filter");
        const typeFilter = document.getElementById("type-filter");
        const dateFilter = document.getElementById("date-filter");
        idFilter.value = "";
        typeFilter.value = "";
        dateFilter.value = "";
        searchWithFilter();
    }

    const searchWithFilter = () => {
        const idValue = document.getElementById("id-filter").value.trim();
        const typeValue = document.getElementById("type-filter").value.trim();
        const dateValue = document.getElementById("date-filter").value.trim();
        let params = new URLSearchParams({
            'id': idValue,
            'type': typeValue,
            'date': dateValue,
        }).toString();
        navigate(`?${params}`);
    }

    const handleCancel = () => {
        setIsAdding(false);
        setIsUpdating(false);
        setIsDeleting(false);
        setIsRefresh(!isRefresh);
    }

    const handleAdd = async () => {
        const newType = document.getElementById("type-new").value.trim();
        const newTitle = document.getElementById("title-new").value.trim();
        const newContent = document.getElementById("content-new").value.trim();
        const isValid = newType.length > 0
            && newTitle.length > 0
            && newContent.length > 0
            && imgFile;
        const newPostData = {
            "type": newType,
            "title": newTitle,
            "content": newContent,
        }
        console.log(newPostData);
        try{
            if (isValid) {
                const formData = new FormData();
                formData.append("post",
                    new Blob([JSON.stringify(newPostData)], { type: "application/json" }));
                formData.append("imageFile", imgFile);
                for (const [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                await userAPI.addPost(formData);
                setIsAdding(false);
                setIsRefresh(!isRefresh);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        const newType = document.getElementById("type-new").value.trim();
        const newTitle = document.getElementById("title-new").value.trim();
        const newContent = document.getElementById("content-new").value.trim();
        const isValid = newType.length > 0
            && newTitle.length > 0
            && newContent.length > 0
            && imgFile;
        const newPostData = {
            "type": newType,
            "title": newTitle,
            "content": newContent,
        }
        console.log(newPostData);
        try{
            if (isValid) {
                const formData = new FormData();
                formData.append("post",
                    new Blob([JSON.stringify(newPostData)], { type: "application/json" }));
                formData.append("imageFile", imgFile);
                await userAPI.updatePost(updatingPost.id, formData);
                setIsUpdating(false);
                setIsRefresh(!isRefresh);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (post) => {
        try {
            await userAPI.deletePost(post);
            setIsDeleting(false);
            setIsRefresh(!isRefresh);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
    };

    return (
        <div className="posts">
            <div className="posts-filter">
                <button className="josefin-sans" id="add-Bt" onClick={() => {
                    setIsAdding(true)
                }}>Add new post
                </button>
                <div className="filters">
                    <div className='form-wrapper'>ID <input type="text" id="id-filter" className="josefin-sans"/></div>
                    <div className='form-wrapper select'>Type <select id="type-filter" className="josefin-sans">
                    <option></option>
                    <option>News</option>
                    <option>Discount</option>
                    </select></div>
                    <div className='form-wrapper'>Date <input type="date" id="date-filter" className="josefin-sans"/></div>
                </div>
                <div>
                    <button className="josefin-sans" onClick={searchWithFilter}>Search</button>
                    <button className="josefin-sans" onClick={clearFilters}>Clear Filters</button>
                </div>
            </div>
            <div className="table-container">
            <table className={`${isLightMode ? "" : "dark"}`}>
                <caption>TOTAL NUMBER OF POSTS : {postData.length}</caption>
                <tbody>
                <tr>
                    <th>No</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Image</th>
                    <th>Edit</th>
                </tr>
                {filteredPost.map((post, index) =>
                    <tr key={post.id}>
                        <td>{index + 1}</td>
                        <td>{post.type}</td>
                        <td>{post.postedTime.substring(0, 10) + " " + post.postedTime.substring(11, 16)}</td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td><img src={post.imageUrl} alt={post.imageName} style={{width: "200px"}}/></td>
                        <td>
                            <button className="edit" onClick={() => {
                                setIsUpdating(true);
                                setUpdatingPost(post);
                            }}><FontAwesomeIcon icon={faPenToSquare}/></button>
                            <button className="delete" onClick={() => {
                                setIsDeleting(true);
                                setDeletingPost(post)
                            }}><FontAwesomeIcon icon={faTrash}/></button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            </div>
            {(isAdding || isUpdating) ?
                <div className="add-post-window">
                    <div></div>
                    <div className="add-post-form">
                        <h1>{isAdding ? "New post" : "Update post"}</h1>
                        <div className="input-fields form-wrapper">
                            <span>Type <span style={{color: "red"}}>* </span></span>
                            <select id="type-new" className="josefin-sans" required={true}
                                    defaultValue={isUpdating ? updatingPost.type : ""}>
                                <option>News</option>
                                <option>Discount</option>
                            </select>
                            <span>Title <span style={{color: "red"}}>* </span></span>
                            <input type="test" id="title-new" className="josefin-sans" required={true}
                                   defaultValue={isUpdating ? updatingPost.title : ""}/>
                            <span>Image <span style={{color: "red"}}>* </span></span>
                            <input type="file" id="image-new" className="josefin-sans" required={true} onChange={handleFileChange}/>
                            <span>Content <span style={{color: "red"}}>* </span></span>
                            <input type="text" id="content-new" className="josefin-sans" required={true}
                                   defaultValue={isUpdating ? updatingPost.content : ""}/>
                        </div>
                        <div className="buttons">
                            <button className="josefin-sans" onClick={handleCancel}>CANCEL</button>
                            {isAdding ?
                                <button className="josefin-sans" onClick={handleAdd}>ADD</button> :
                                <button className="josefin-sans" onClick={handleUpdate}>SAVE</button>}
                        </div>
                    </div>
                </div> : null}
            {isDeleting ?
                <div className="delete-post-window">
                    <div></div>
                    <div className="delete-post-form">
                        <h3>Delete this post ?</h3>
                        <div className="buttons">
                            <button className="josefin-sans" onClick={handleCancel}>CANCEL</button>
                            <button className="josefin-sans" onClick={() => {
                                handleDelete(deletingPost.id)
                            }}>DELETE
                            </button>
                        </div>
                    </div>
                </div> : null}
        </div>
    )
}