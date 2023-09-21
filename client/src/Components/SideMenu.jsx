import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideMenu = ({ category, currentPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/posts/?category=${category}`
        );
        setPosts(response.data.filter((post) => post.id !== currentPostId));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category, currentPostId]);

  return (
    <div className="menu">
      <h1>Similar posts</h1>
      <ul className="menu__list">
        {posts.map((post) => (
          <li key={post.id} className="menu__item">
            <Link to={`/post/${post.id}`}>
              <img src={`../uploadImages/${post.image}`} />
              <h1>{post.title}</h1>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
