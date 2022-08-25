import styles from "./styles.css";

function Post(props) {
  function getTags() {
    if (props.tags == null || !props.tags.length) {
      return <label>No tags</label>;
    } else {
      return props.tags.map((tag, index) => {
        return (
          <label className="tag" key={props._id + tag + index}>
            #{tag}
          </label>
        );
      });
    }
  }
  return (
    <div className="post-content-wrapper">
      <div className="username-wrapper">
        <label>Username:</label>
        <h2 className="username">{props.username}</h2>
      </div>
      <div className="message-wrapper">
        <label>Message:</label>
        <h3 className="message">{props.message}</h3>
      </div>
      <div className="tags-wrapper">
        <label>Tags:</label>
        <div className="tags">{getTags()}</div>
      </div>
      <div className="buttons-wrapper">
        <button className="edit-button">EDIT</button>
        <button
          className="delete-button"
          onClick={(e) => props.deletePost(props._id, e)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
export default Post;
