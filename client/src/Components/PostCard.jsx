import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const PostCard = ({post}) => {
  return (
    <article key={post.id}>
      <Link to={`/post/${post.id}`}>
        <div className="post__header">
          <img src={`../uploadImages/${post.image}`} />
        </div>
        <div className="post__content">
          <h1>{post.title}</h1>
        </div>
      </Link>
      <div className="post__footer">
        <div></div>
        <div className="post__date">{moment(post.date).fromNow()}</div>
      </div>
    </article>
  );
};

export default PostCard;
