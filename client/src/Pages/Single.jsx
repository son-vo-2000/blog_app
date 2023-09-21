import React, { useContext, useEffect, useState } from "react";
import "../styles/single.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideMenu from "../Components/SideMenu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../contextApi/authContext";

const Single = () => {
  const [post, setPost] = useState({});
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // http://localhost:5173/post/id
  // we get just the id
  const postId = location.pathname.split("/")[2];

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/posts/${postId}`);
      setPost(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${postId}`);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const formatDesc = (desc) => {
    const formated = new DOMParser().parseFromString(desc, "text/html");
    return formated.body.textContent;
  };

  const goBackToPrev = () => {
    navigate(-1);
  };

  return (
    <div className="blog">
      <article className="blog__item">
        <i onClick={goBackToPrev} className="fa-solid fa-arrow-left-long" />
        <img className="blog__image" src={`../uploadImages/${post?.image}`} />

        <div className="blog__author">
          <div className="author">
            <img src={post.userImage} />
            <div className="author-infor">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
          </div>
          {currentUser?.username === post.username && (
            <div className="blog__edit">
              <Link to={`/write?edit=2`} state={post}>
                <i className="fa-solid fa-pen" />
              </Link>

              <i class="fa-solid fa-trash" onClick={handleDelete} />
            </div>
          )}
        </div>
        <div className="blog__body">
          <h1>{post.title}</h1>
          <p>{formatDesc(post.desc)}</p>
        </div>
      </article>
      <aside className="blog__menu">
        <SideMenu category={post.category} currentPostId={post.id} />
      </aside>
    </div>
  );
};

export default Single;
