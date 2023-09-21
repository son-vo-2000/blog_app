import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/write.css";
import { AuthContext } from "../../contextApi/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state === null ? "" : state.desc);
  const [title, setTitle] = useState(state === null ? "" : state.title);
  const [image, setImage] = useState(state === null ? null : state.image);
  const [category, setCategory] = useState(
    state === null ? "" : state.category
  );
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const uploadImge = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await axios.post(
        "http://localhost:4000/api/upload",
        formData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateAndUpdate = async (e) => {
    e.preventDefault();
    if (!currentUser) return; 
    try {
      const imageUrl = await uploadImge();
      if(!imageUrl){
        setError("Don't forget your image");
        return;
      }
      state
        ? // Update post with id
          await axios.put(`http://localhost:4000/api/posts/${state.id}`, {
            title,
            desc: value,
            image: image ? imageUrl : "",
            category,
            userId: currentUser.id,
          })
        : // Create new post
          await axios.post(`http://localhost:4000/api/posts`, {
            title,
            desc: value,
            category,
            image: image ? imageUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userId: currentUser.id,
          });
      navigate("/");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setValue(state === null ? "" : state.desc);
    setTitle(state === null ? "" : state.title);
    setImage(state === null ? null : state.image);
    setCategory(state === null ? "" : state.category);
    setError("")
  }, [state]);

  const handleCancel = ( ) =>{
    setValue("");
    setTitle("")
    setImage(null);
    setCategory("");
    setError("")
  }
  return (
    <div className="write__page">
      <div className="write__content">
        {error && <p className="form__error-message">{error}</p>}
        <h1>{state === null ? "Create New Post" : "Update Your Post"}</h1>
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="input__wrap">
          <h1>Image</h1>
          <label htmlFor="image">
            <i className="fa-solid fa-arrow-up-from-bracket" /> Upload image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="write__category">
          <h1>Category</h1>
          <div className="cate__radio">
            <div className="radio__wrap">
              <input
                type="radio"
                id="art"
                checked={category === "art"}
                name="category"
                value="art"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="art">Art</label>
              <br></br>
            </div>
            <div className="radio__wrap">
              <input
                type="radio"
                id="tech"
                checked={category === "technology"}
                name="category"
                value="technology"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="tech">Technology</label>
              <br></br>
            </div>
            <div className="radio__wrap">
              <input
                type="radio"
                id="food"
                checked={category === "food"}
                name="category"
                value="food"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <div className="write__btns">
          <button onClick={handleCreateAndUpdate}>
            {state === null ? "Publish" : "Update Post"}
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Write;
