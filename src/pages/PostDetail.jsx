import { useParams, useNavigate, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import '../styles/PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  // Using custom useFetch hook to fetch post data
  const {
    data: post,
    loading: postLoading,
    error: postError,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  // Using custom useFetch hook to fetch comments
  const {
    data: comments,
    loading: commentsLoading,
    error: commentsError,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

  // Combine loading states
  const loading = postLoading || commentsLoading;
  const error = postError || commentsError;

  // Display loading state
  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // Display error state
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

  // Handle post not found
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
          Comments ({comments ? comments.length : 0})
        </h2>
        <div className="comments-list">
          {comments && comments.map((comment) => (
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
