import styles from "./styles.css";
import { useState } from "react";
import { CreateRequest } from "../API/api";

function CreatePost(props) {
  var [username, setUsername] = useState("");
  var [message, setMessage] = useState("");
  var [tags, setTags] = useState([]);

  function OnCancelClick() {
    setUsername("");
    setMessage("");
    setTags("");
  }
  function SplitTags() {
    if (!tags.length) return [];
    else return tags.trim().split(/\s+/);
  }
  const sendRequest = async (event) => {
    event.preventDefault();
    if (message === "" || username === "") return null;
    const newPost = {
      username: username,
      message: message,
      tags: SplitTags(),
    };
    await CreateRequest(newPost);
    props.updatePosts();
    setUsername("");
    setMessage("");
    setTags([]);
  };

  return (
    <form onSubmit={sendRequest} className="create-post-content-wrapper">
      <h2 className="new-post-heading">Create New Post</h2>
      <div className="create-username-wrapper">
        <input
          className="create-username"
          type="text"
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      <div className="create-message-wrapper">
        <input
          className="create-message"
          type="text"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></input>
      </div>
      <div className="create-tags-wrapper">
        <input
          className="create-tags"
          type="text"
          placeholder="tags"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
        ></input>
      </div>
      <div className="create-buttons-wrapper">
        <input type="submit" value={"SAVE"} className="save-button"></input>
        <button className="cancel-button" onClick={OnCancelClick}>
          CANCEL
        </button>
      </div>
    </form>
  );
}

export default CreatePost;
