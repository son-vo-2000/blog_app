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
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://blogapp-production-7f9d.up.railway.app/api/posts${category}`
      );
      setPosts(response.data);
      setSearchPosts(response.data);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
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
      {isLoading ? (
        <div>Loading... Please wait</div>
      ) : (
        <div className="home__posts">
          {searchPosts.map((post) => (
            <PostCard post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
