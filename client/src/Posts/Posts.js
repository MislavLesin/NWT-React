import Post from "./Post/Post";
import styles from "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TestPost from "./Post/TestPost";

function Posts() {
  var [posts, setPosts] = useState([]);
  const url = "http://localhost:5000/posts";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function MapPosts() {
    if (posts.length < 1) {
      return (
        <div>
          <h1>There are no Posts yet!</h1>
        </div>
      );
    } else {
      return posts.map((post) => {
        return (
          <div className="post" key={post._id}>
            <Post
              username={post.username}
              message={post.message}
              tags={post.tags}
              _id={post._id}
            />
          </div>
        );
      });
    }
  }

  return <div className="posts-content-wrapper">{MapPosts()}</div>;
}

export default Posts;
