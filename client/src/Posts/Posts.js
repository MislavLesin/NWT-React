import Post from "./Post/Post";
import styles from "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "../CreatePost/CreatePost";
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

  async function RefreshPosts() {
    console.log("Refreshing posts..");
    let updatedPosts = await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  }

  async function DeletePost(id, e) {
    e.preventDefault();
    await axios
      .delete(`${url}/${id}`)
      .then(console.log("Deleted post with id - " + id))
      .then(
        setPosts(
          posts.filter(function (post) {
            return post._id !== id;
          })
        )
      )
      .catch((error) => console.log(error));
  }

  function MapPosts() {
    if (posts.length < 1) {
      return null;
    } else {
      return posts.map((post) => {
        return (
          <div className="post" key={post._id}>
            <Post
              deletePost={DeletePost}
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

  return (
    <div className="posts-content-wrapper">
      <CreatePost updatePosts={RefreshPosts} />
      {MapPosts()}
    </div>
  );
}

export default Posts;
