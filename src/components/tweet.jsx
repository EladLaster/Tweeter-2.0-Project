import "./tweet.css";

export function Tweet({ tweet }) {
  return (
    <li className="post-card">
      <div className="post-header">
        <span className="username">{tweet.userName}</span>
        <span className="time">{new Date(tweet.created_at).toLocaleString()}</span>
      </div>
      <div className="post-content"><strong>{tweet.content}</strong></div>
    </li>
  );
}
