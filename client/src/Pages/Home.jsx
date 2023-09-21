import React, { useEffect, useState } from "react";
import "../styles/home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Category from "../Components/Category";
import PostCard from "../Components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search;
  const [search, setSearch] = useState("");
  const [searchPosts, setSearchPosts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/posts${category}`
      );
      setPosts(response.data);
      setSearchPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterPosts = () => {
    setSearchPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  useEffect(() => {
    filterPosts();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="home__page">
      <div className="home__header">
        <Category />
        <input
          value={search}
          onChange={handleSearch}
          name="search"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="home__posts">
        {searchPosts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
