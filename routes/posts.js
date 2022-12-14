const express = require('express');
const Posts = require('../models/posts1');//import created user model
const auth = require('../middleware/auth')

const router = express.Router();

//save delivery

router.post('/post/save',(req,res)=>{

    let newPost = new Posts(req.body);//constant eka haraha uda gatta Posts instanciate krnna ona
    
    newPost.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Order placed successfully"
        });    
    });

});

//get deliveries
router.get('/posts',(req,res) =>{
    Posts.find().exec((err,posts) =>{//find is a mongoose function
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

//get a specific delivery
router.get("/post/:id",(req,res) =>{

     let postId = req.params.id;

     Posts.findById(postId,(err,post) =>{
         if(err){
             return res.status(400).json({success:false,err});
         }
         return res.status(200).json({
             success:true,
             post
         });
     })
    
})

//update deliveries
router.put('/post/update/:id',(req,res)=>{
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body//eligible to update what is needed to update without restricting
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated successfully"
            });
        }
    );
});

//delete delivery

router.delete('/post/delete/:id',(req,res) =>{
    Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{

        if(err) return res.status(400).json({
            message: "Delete unsuccessful",err
        });
        return res.json({
            message: "Delete successful",deletedPost
        });
    });
});

module.exports = router;
