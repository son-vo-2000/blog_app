import jwt  from 'jsonwebtoken';
import {db} from '../database.js';

export const getAllPost =  (req, res) =>{
    const query = req.query.category ? "SELECT * FROM posts WHERE category=?" : "SELECT * FROM posts";

    db.query(query,[req.query.category], (err,data) => {
        if(err) return res.status(500).json(err);

        return res.status(200).json(data);
    })
}

export const getPostById = (req, res) => {
    const query =  "SELECT p.id, `username`, `title`, `desc`, p.image, u.image AS userImg, `category`,`date` FROM users u JOIN posts p ON u.id = p.userId WHERE p.id = ? ";
    db.query(query,[req.params.id], (err,data) => {
        if(err) return res.json(err);

        return res.status(200).json(data[0])
    } )
}

export const createNewPost = (req, res) => {
    const userId = req.body.userId;
    if(!userId) return res.status(403).json("Not authenticated!");

    const values = [req.body.title, req.body.desc, req.body.image, req.body.category, req.body.date, userId]
    const query = "INSERT INTO posts (`title`, `desc`,`image`, `category`, `date`, `userId`) VALUES (?)"

    db.query(query,[values], (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json("Post created successfully!");
    })
}
export const deletePost = (req, res) => {
    //verify the user by token to see if we allow user to delete post
    //

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? ";

    db.query(q, [postId], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
   

    })
}
export const updatePost = (req, res) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    if(!postId || !userId) return res.status(403).json("Error! Not authenticated!");

    const values = [req.body.title, req.body.desc, req.body.image, req.body.category];
    const query ="UPDATE posts SET `title`=?,`desc`=?,`image`=?,`category`=? WHERE `id` = ? AND `userId` = ?";
    
    db.query(query, [...values, postId, userId],(err, data)=>{
        if(err) return res.status(500).json(err);
        return res.json("Post has been updated")
    }  )
}