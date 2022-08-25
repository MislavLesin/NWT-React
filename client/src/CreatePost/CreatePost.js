import styles from "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

function CreatePost(props) {
  var [username, setUsername] = useState("");
  var [message, setMessage] = useState("");
  var [tags, setTags] = useState([]);

  function SplitTags() {
    if (!tags.length) return [];
    else return tags.trim().split(/\s+/);
  }
  const sendRequest = (event) => {
    event.preventDefault();
    const newPost = {
      username: username,
      message: message,
      tags: SplitTags(),
    };
    axios
      .post("http://localhost:5000/posts", newPost)
      .then((Response) => console.log(Response))
      .then(() => props.updatePosts())
      .catch((error) => console.log(error));

    setUsername("");
    setMessage("");
    setTags([]);
  };

  return (
    <form onSubmit={sendRequest} className="create-post-content-wrapper">
      <h2 className="new-post-heading">Create New Post</h2>
      <div className="username-wrapper">
        <input
          className="username"
          type="text"
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      <div className="message-wrapper">
        <input
          className="message"
          type="text"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></input>
      </div>
      <div className="tags-wrapper">
        <div className="tags">
          <input
            className="tags"
            type="text"
            placeholder="tags"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          ></input>
        </div>
      </div>
      <div className="buttons-wrapper">
        <input type="submit" value={"SAVE"} className="edit-button"></input>
        <button className="delete-button">DELETE</button>
      </div>
    </form>
  );
}

export default CreatePost;
