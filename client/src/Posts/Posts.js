import Post from "./Post/Post";
import styles from "./styles.css";
import React, { useState, useEffect } from "react";
import CreatePost from "../CreatePost/CreatePost";
import EditPost from "../EditPost/EditPost";
import { GetRequest, DeleteRequest, EditRequest } from "../API/api";

function Posts() {
  var [posts, setPosts] = useState([]);
  var [editing, setEditing] = useState(false);
  var [editingPost, setEditingPost] = useState({});
  const url = "http://localhost:5000/posts";

  useEffect(() => {
    GetRequest(setPosts);
  }, []);

  async function RefreshPosts() {
    GetRequest(setPosts);
  }

  async function DeletePost(id, e) {
    e.preventDefault();
    await DeleteRequest(id).then(
      setPosts(
        posts.filter(function (post) {
          return post._id !== id;
        })
      )
    );
  }

  async function ModifyEditingPost(_username, _message, _tags, id, _date) {
    await EditRequest(
      { ...editingPost, username: _username, message: _message, tags: _tags },
      id
    );
    RefreshPosts();
    setEditing(false);
  }

  function EditingPost(id) {
    setEditingPost(
      posts.find((post) => {
        return post._id === id;
      })
    );
    setEditing(true);
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
            setEditingPost={setEditingPost}
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
