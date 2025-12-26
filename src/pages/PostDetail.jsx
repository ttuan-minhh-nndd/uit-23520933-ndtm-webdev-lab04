import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect: Fetch post and comments when postId changes
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch post and comments in parallel
        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`),
        ]);

        if (!postResponse.ok) {
          throw new Error('Post not found');
        }

        const postData = await postResponse.json();
        const commentsData = await commentsResponse.json();

        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-detail-container">
        <div className="error">Error: {error}</div>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="error">Post not found</div>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <Link to="/dashboard" className="back-link">
          ← Back to Posts
        </Link>
      </div>

      <article className="post-detail">
        <h1 className="post-detail-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-id">Post #{post.id}</span>
          <span className="post-user">By User {post.userId}</span>
        </div>
        <p className="post-detail-body">{post.body}</p>
      </article>

      <section className="comments-section">
        <h2 className="comments-title">
          Comments ({comments.length})
        </h2>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <h3 className="comment-name">{comment.name}</h3>
                <span className="comment-email">{comment.email}</span>
              </div>
              <p className="comment-body">{comment.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
