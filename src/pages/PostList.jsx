import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect: Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        // Limit to first 20 posts for better UX
        setPosts(data.slice(0, 20));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="posts-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1>All Blog Posts</h1>
        <p className="posts-count">{posts.length} posts available</p>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
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
