import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contextApi/authContext";
import "../styles/userPost.css";
import PostCard from "./PostCard";

const User_Posts = () => {
  const [userPosts, setUserPosts] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const fetchData = async () => {
    if (!currentUser) return;
    const userId = currentUser.id;
    try {
      const response = await axios.post("http://localhost:4000/api/users", {
        userId,
      });

      setUserPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="user_posts">
      <div className="post__list">
        {userPosts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default User_Posts;
