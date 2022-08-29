import { useState, useRef, useDebugValue, useEffect } from "react";
import "./styles.css";
function EditPost(props) {
  var [username, setUsername] = useState(props.data.username);
  var [message, setMessage] = useState(props.data.message);
  var [tags, setTags] = useState(props.data.tags);

  useEffect(() => {
    if (tags.length < 1) {
      setTags([]);
    } else {
      setTags(tags.toString().split(" "));
    }
  }, []);

  function sendRequest(e) {
    e.preventDefault();
    if (tags.length < 1) {
      setTags([]);
    } else {
      setTags(tags.toString().split(" "));
    }
    props.ModifyEditingPost(
      username,
      message,
      tags,
      props.data._id,
      props.data.date
    );
  }

  return (
    <form onSubmit={sendRequest} className="edit-post-content-wrapper">
      <h2 className="edit-post-heading">Edit Post</h2>
      <div className="edit-username-wrapper">
        <input
          className="edit-username"
          type="text"
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      <div className="edit-message-wrapper">
        <input
          className="edit-message"
          type="text"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></input>
      </div>
      <div className="edit-tags-wrapper">
        <input
          className="edit-tags"
          type="text"
          placeholder="tags"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
        ></input>
      </div>
      <div className="edit-buttons-wrapper">
        <input
          type="submit"
          value={"SAVE"}
          className="edit-save-button"
        ></input>
        <button
          className="edit-cancel-button"
          onClick={() => {
            props.setEditing(false);
          }}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}

export default EditPost;
