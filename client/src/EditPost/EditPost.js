import { useState, useRef, useDebugValue, useEffect } from "react";
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
        <button
          className="cancel-button"
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
