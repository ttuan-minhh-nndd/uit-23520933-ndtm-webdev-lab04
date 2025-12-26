import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import '../styles/PostList.css';

const PostList = () => {
  // Using custom useFetch hook to fetch posts
  const { data: posts, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  );

  // Display loading state
  if (loading) {
    return (
      <div className="posts-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="posts-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  // Limit to first 20 posts for better UX
  const displayPosts = posts ? posts.slice(0, 20) : [];

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1>All Blog Posts</h1>
        <p className="posts-count">{displayPosts.length} posts available</p>
      </div>

      <div className="posts-grid">
        {displayPosts.map((post) => (
          <Link
            to={`/dashboard/post/${post.id}`}
            key={post.id}
            className="post-card"
          >
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">
              {post.body.substring(0, 100)}...
            </p>
            <span className="read-more">Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostList;
