const express  = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get("", async (request, response) => {
    try {
        const posts =  await Post.find();
        response.status(200).json(posts);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Server Error" });
    }
});


router.get("/post/:id", async (request, response) => {
    try{
        let postId = request.params.id;
        const data = await Post.findById({ _id: postId });
        if(!data){
            return response.status(404).json({ message: "Post not found" });
        }
        response.status(200).json(data);

    }
    catch(error){
        console.error(error);
        response.status(500).json({ message: "Server Error" });
    }
})























/*function insertPost(){
   Post.insertMany([
                { title: "Introduction to JavaScript", content: "JavaScript is a powerful language for web development." },
            { title: "Understanding Node.js", content: "Node.js allows you to run JavaScript on the server-side." },
            { title: "Basics of React.js", content: "React.js is a library for building user interfaces." },
            { title: "Getting Started with MongoDB", content: "MongoDB is a NoSQL database that stores data in JSON-like documents." },
            { title: "What is Express.js?", content: "Express.js is a minimal and flexible Node.js web application framework." },
            { title: "Learn HTML and CSS", content: "HTML and CSS are the building blocks of web development." },
            { title: "Mastering APIs", content: "APIs allow applications to communicate and share data seamlessly." },
            { title: "Understanding Promises in JavaScript", content: "Promises are a way to handle asynchronous operations in JavaScript." },
            { title: "What is TypeScript?", content: "TypeScript is a superset of JavaScript that adds type safety." },
            { title: "Building REST APIs", content: "REST APIs follow a standard architectural style for web services." },
            { title: "Intro to Angular", content: "Angular is a platform for building mobile and desktop web applications." },
            { title: "Getting Started with Vue.js", content: "Vue.js is a progressive JavaScript framework for building UI." },
            { title: "Learning Webpack", content: "Webpack is a powerful tool for bundling JavaScript modules." },
            { title: "What is GraphQL?", content: "GraphQL is a query language for your API." },
            { title: "Understanding Middleware", content: "Middleware functions are used in Express.js to handle requests." },
            { title: "Intro to Full-Stack Development", content: "Full-stack developers work on both frontend and backend." },
            { title: "Understanding HTTP Methods", content: "HTTP methods like GET, POST, PUT, DELETE are used in web services." },
            { title: "Getting Started with Django", content: "Django is a high-level Python web framework." },
            { title: "Best Practices for Code Reviews", content: "Code reviews help ensure quality and consistency in your codebase." },
            { title: "Optimizing Web Performance", content: "Learn how to improve your website's speed and efficiency." },
        ]);
    
}
 
insertPost(); */


module.exports = router;