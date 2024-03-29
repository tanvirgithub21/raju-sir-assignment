const express = require("express")
const mongoose = require("mongoose")
const postSchema = require("../schemas/postSchema")
const route = express.Router()


const Post = new mongoose.model("post", postSchema)


// get all post 
route.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            message: 'find all posts',
            result: posts
        });
    } catch (err) {
        res.status(500).json({ error: "this is server side error" })
    }
})

// get a single post 
route.get("/single/:id", async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(200).json({
                message: 'Post found',
                result: post
            });
        }
    } catch (err) {
        res.status(500).json({ error: "this is server side error" })
    }
})

// post a single post data
route.post("/", async (req, res) => {
    try {
        const postData = req.body;
        const newPost = new Post(postData)
        const result = await newPost.save()
        if (!result) {
            res.status(500).json({ error: "this is server side error" })
        } else {
            res.status(200).json({
                message: "Add post successfully",
                result,
            })
        }
    } catch (err) {
        res.status(500).json({ error: "this is server side error" })
    }
})

// user like already exit to removed and user not exit add like
route.put("/like/:id", async (req, res) => {
    const postId = req.params.id;
    const likeUser = req.body.user;

    try {
        const post = await Post.findById(postId);
        const likeIndex = post.likes.findIndex(like => like.user === likeUser);
        if (likeIndex === -1) {
            // Like user doesn't exist in likes array, add new like
            post.likes.push({ user: likeUser });
            const result = await post.save();
            res.status(200).json({
                message: 'Like added successfully',
                result
            });
        } else {
            // Like user already exists in likes array, remove like
            post.likes.splice(likeIndex, 1);
            const result = await post.save();
            res.status(200).json({
                message: 'Like removed successfully',
                result
            });
        }
    } catch (err) {
        res.status(500).json({ error: "this is server side error" })
    }
})

// delete single post 
route.delete("/delete/:id", async (req, res) => {
    const postId = req.params.id;

    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(200).json({
                message: 'Post deleted',
                result: deletedPost
            });
        }
    } catch (err) {
        res.status(500).json({ error: "this is server side error" })
    }
})

module.exports = route