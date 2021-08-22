import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { ImPencil2 } from "react-icons/im";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa"
import { MdModeComment } from "react-icons/md";
import { Avatar, Typography, Card, Badge } from '@material-ui/core';
import { Link } from "react-router-dom";


   export default  function Post()
{

    const useStyles = makeStyles((theme) =>
    ({
        root: {
            flexGrow: 1,
        },
        textField: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        row: {
            display: 'flex',
            alignItems: "center"

        }
    }));


    const useStyleAvatar = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },

        large: {
            width: theme.spacing(12),
            height: theme.spacing(12),
        },
    }))


     const [posts,setPosts]= useState([]);
     const [newpost,setnewpost]= useState("");



      async function  fetchPosts()
      {
        await  axios.get("http://localhost:4000/posts").then((res)=>{setPosts(res.data.data)}).catch((err)=>{alert(err)});
      }
      
    async function AddPost()
    {
        const addedPost={ 
                          user:"610eb2842012ce3d60c67abb",
                          text:newpost, 
                       }
         await axios.post('http://localhost:4000/posts',addedPost);
         fetchPosts();
    }


      useEffect(()=>{
         fetchPosts();
         console.log("posts =",posts);
      },[]);
        

    const classes = useStyles();

    const avatarclass = useStyleAvatar()

    
        return (
            
            <>
                <Typography variant="h2" component="h2" className="lg-title" >
                    <span>Acoba Forum</span>
                </Typography>
    
                <Card className={classes.root} style={{ padding: "25px", border: "solid 1px #bbb", marginBottom: "70px" }}>
    
                    <Grid className={classes.row} container spacing={1} >
    
                        <Grid item xs={1}>
                            <Avatar src="/static/images/avatar/1.jpg" className={avatarclass.large} />
                        </Grid>
                        <Grid item xs={11}>
                            
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h2" style={{ width: "97%", float: "right", marginBottom: "20px", display: "flex", "alignItems": "center" }}>
                                <ImPencil2 style={{ marginRight: "20px" }} /><span>write what's in your mind</span>
                            </Typography>
                        </Grid>
                           <Grid className={classes.row} container spacing={2}>
                           <Grid item xs={10}>
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange= { (event)=>{setnewpost(event.target.value)}} style={{ width: "97%", float: "right" }} />
                        </Grid>
                        <Grid item xs={2}>
                            <Link to="/posts"  className="styled-btn" onClick={AddPost}>Add post<FaLocationArrow /></Link>
                        </Grid>
                           </Grid>
                        </Grid>
                    </Grid>
                </Card>
    
                <Card style={{ padding: "25px", border: "solid 1px #bbb", marginTop: "20px", background: "  #e2e8f0" }}>
    
    
                    {posts.map((post) => {
        
                        return (
                            <div key={post._id} style={{ border: "solid 1px #bbb", padding: "30px", borderRadius: "10px", marginBottom: "20px", background: "#fff" }}>
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" width="50" alt="User" />
    
                                <div >
                                    <h6>{post.username}</h6>
                                    <p >
                                        {post.text}
                                    </p>
                                    <p> replied at <span >{post.date}</span></p>
                                </div>
    
                                <div >
                                    <div className={classes.root} style={{ marginTop: "20px", color: "#bbb" }}>
                                        <Badge badgeContent={777} style={{ marginRight: "20px" }} >
                                            <AiFillLike style={{ fontSize: "25px" }} />
                                        </Badge>
                                        <Badge badgeContent={4} style={{ marginRight: "20px" }}>
                                            <AiFillDislike style={{ fontSize: "25px" }} />
                                        </Badge>
    
                                        <Badge badgeContent={4} style={{ marginRight: "20px" }}>
                                            <MdModeComment style={{ fontSize: "25px" }} />
                                        </Badge>
                                    </div>
                                </div>
                            </div>);
                    })}
    
                </Card>
    
    
            </>
        );
    
    }

