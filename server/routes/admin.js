const express = require('express');

const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt  = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;



//middleware

const authMiddlweware = async (request, response, next) => {
        const token = request.cookies.token;
        if(!token){
                return response.status(401).json({message: "Unauthorized"});
        }
        try{
                const decoded = jwt.verify(token, jwtSecret);
                request.user = decoded;
                next();
        }
        catch(error){
                return response.status(401).json({message: "Unauthorized"});
        }
}

router.post("/admin", async (request, response) => {
        try{
                const { username, password } = request.body;
                const user = await User.findOne({ username });
                if (!user) {
                        return response.status(401).json({ message: "Invalid username or password" });
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                        return response.status(401).json({ message: "Invalid username or password" });
                }
                const token = jwt.sign({ username }, jwtSecret);
                response.cookie("token", token, { httpOnly: true });
                response.status(200).json({ message: "Login successful", token });
        }
        catch(error){
                response.status(500).json({ message: error.message });
        }
});



router.post("/register", async (request, response) => {
        try{
                const { username, password } = request.body;
                const hashedPassword = await bcrypt.hash(password, 10);
                try{
                        const user = await User.create({ username, password: hashedPassword });
                        response.status(201).json({ message: "User created successfully" });
                }
                catch(error){
                        response.status(500).json({ message: error });
                }
        }
        catch(error){
                response.status(500).json({ message: "Internal Server error"});
        }
})

// admin create post
//add post to blog api
router.post("/add-post", authMiddlweware, async (request, response) => {
        try{
                const { title, content } = request.body;
                const post = await Post.create({ title, content });
                response.status(201).json({ message: "Post created successfully", post });
        }
        catch(error){
                response.status(500).json({ message: error });
        }
})
module.exports = router;


// Admin Edit Post

router.put("/edit-post/:id", authMiddlweware, async (request, response) => {
        try{
                const postId = request.params.id;
                const { title, content } = request.body;
                const post = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });
                response.status(200).json({ message: "Post updated successfully", post });

        }
        catch(error){ 
                response.status(500).json({ message: error });
        }
});

// Admin Delete Post
router.delete("/delete-post/:id", authMiddlweware, async (request, response) => {
        try{
                const postId = request.params.id;
                const post = await Post.findByIdAndDelete(postId);
                response.status(200).json({ message: "Post deleted successfully", post });
        }
        catch(error){
                response.status(500).json({ message: error });
        }
});


// Admin Logout
router.get("/logout", async (request, response) => {
        response.clearCookie("token");
        response.status(200).json({ message: "Logout successful" });
});