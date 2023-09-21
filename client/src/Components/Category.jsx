import React,{useState}  from "react";
import { Link } from "react-router-dom";
import Navbar_Links from "./Navbar_Links";

const Category = () => {
  const [selectedCate, setSelectedCate] = useState(0);
  
  const switchCate = (index) => {
    setSelectedCate(index);
  };

  return (
    <ul className="cate">
      {Navbar_Links.map((link, index) => (
        <li
          className={`cate__item ${
            selectedCate === index ? "selectedCate" : ""
          }`}
          key={index}
        >
          <Link to={link.url} onClick={() => switchCate(index)}>
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Category;
