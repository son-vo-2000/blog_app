import { db } from "../database.js"

export const getUserPosts = (req,res) => {
    if(!req.body.userId) return res.status(403).json("Not authenticated!");

    const query = "SELECT * FROM posts WHERE userId = ?";
    
    db.query(query,[req.body.userId], (err, data) => {
        if(err) return res.status(500).json(err);

        return res.status(200).json(data)
    })
}