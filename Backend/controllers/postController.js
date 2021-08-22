const Post = require('../models/posts');
const User =require('../models/user')
module.exports=
{

    //create post
    createpost: (req, res) => {
      const data={text:req.body.text,user:req.user.id}
     
      Post.create(data, (err, post) => {
          if (err) {
            res.status(500).json({
              message: "post not created " + err,
              data: null,
            });
          } else {
            User.findOneAndUpdate(
              { _id: req.body.user},
              { $push: { posts: post._id } },
              (error, user) => {
                if (error) {
                  res.status(500).json({
                    message: "post added but not pushed in user  ",
                    data: null,
                  });
                } else {
                  res.status(200).json({
                    message: "post added and  pushed in user  ",
                    data: null,
                  });
                }
              }
            );
          }
        });
      },

   

    
    getPostById:(req,res)=>
  
    {
        Post.findById({_id:req.params.id}).populate({path:"user"})
        .then((post)=>{
            res.status(200).json({
            message:"post found successfully",
            data:post,})})
        .catch((err)=>{
            res.status(500).json({
            message:"post not found"+ err,
            data:null,

        })
        })
    },
    updatePost:(req,res)=>
    {
      Post.findOneAndUpdate({_id:req.params.id},req.body,(err,post)=>{
         
        if(err)
        {
          res.status(500).json({
           message:"post not updated"+ err,
           data:null,
        })
        }
        else
        {

            Post.findById({_id:req.params.id})
            .then((post)=>{res.status(200).json({
                message:"post updated successfully",
                data:post,})})
            .catch((err)=>{
                   res.status(500).json({
                    message:"error"+ err,
                    data:null,
            })
          
             })

        }

      });

    },
    deletePost:(req,res)=>
    {
        Post.findByIdAndDelete({_id:req.params.id},(err,post=>{
            if(err)
            {
              res.status(500).json({
                                    message:"error post not  deleted"+err,
                                    data:null
                                   });
            }
            else
            {
              res.status(201).json({
                                    message:"post deleted successfully",
                                    data:post,                               
                                  });

            }
        }))
      
    },

    getAllPosts:(req,res)=>
    {
       Post.find({}).then((posts)=>{
          if(posts.length<=0)
          {
              res.status(500).json({
                  message:"there is no posts in system ..",
                  data:"null",
              })
          }
          else
          {
              res.status(200).json({
                  message:"posts in system",
                  data:posts
              });
          }

       })

    }



}