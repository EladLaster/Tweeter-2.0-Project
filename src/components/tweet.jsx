import "./tweet.css"

export function Tweet({ tweet, onDelete }) {
  return (
    <li className="post-card">
        <button className="delete-btn" onClick={onDelete}>Delete Post</button>
      <div className="post-header">
        <span className="username">{tweet.username}</span>
        <span className="time">{tweet.time}</span>
      </div>
      <div className="post-content">{tweet.text}</div>
    </li>
  );
}
