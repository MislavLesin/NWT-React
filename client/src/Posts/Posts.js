import Post from "./Post/Post";
import styles from "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "../CreatePost/CreatePost";
import EditPost from "../EditPost/EditPost";

function Posts() {
  var [posts, setPosts] = useState([]);
  var [editing, setEditing] = useState(false);
  var [editingPost, setEditingPost] = useState({});
  const url = "http://localhost:5000/posts";

  let postToEdit = {
    username: "",
    message: "",
    tags: [],
    _id: 0,
    date: "",
  };

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

  async function ModifyEditingPost(_username, _message, _tags, id, _date) {
    postToEdit.username = _username;
    postToEdit.message = _message;
    postToEdit.tags = _tags;
    console.log(
      await axios
        .put(`${url}/${id}`, postToEdit)
        .then(console.log("Updated post with id - " + id))
        .catch((error) => console.log(error))
    );
    RefreshPosts();
    setEditing(false);
  }
  function MapPosts() {
    if (posts.length < 1) {
      return null;
    } else {
      return posts.map((post) => {
        return (
          <Post
            deletePost={DeletePost}
            username={post.username}
            message={post.message}
            tags={post.tags}
            _id={post._id}
            editPost={EditingPost}
            key={post._id}
          />
        );
      });
    }
  }

  function EditingPost(id) {
    console.log("In posts function editingPost(id)");

    postToEdit = posts.find((post) => {
      return post._id === id;
    });
    console.log(postToEdit);
    setEditingPost(postToEdit);
    setEditing(true);
  }

  function decideIfEditing() {
    if (editing) {
      return (
        <div className="posts-content-wrapper">
          <EditPost
            data={editingPost}
            updatePosts={RefreshPosts}
            setEditing={setEditing}
            ModifyEditingPost={ModifyEditingPost}
            key={editingPost._id}
          />
          {MapPosts()}
        </div>
      );
    } else {
      return (
        <div className="posts-content-wrapper">
          <CreatePost updatePosts={RefreshPosts} />
          {MapPosts()}
        </div>
      );
    }
  }
  return decideIfEditing();
}

export default Posts;
