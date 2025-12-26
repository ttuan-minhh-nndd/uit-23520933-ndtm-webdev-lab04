# useFetch Custom Hook - Documentation

## Overview
A reusable custom React hook for data fetching that manages loading states, error handling, and data caching.

## Signature
```javascript
const { data, loading, error, refetch } = useFetch(url, options);
```

## Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | The API endpoint URL to fetch from |
| `options` | object | No | Optional fetch options (method, headers, etc.) |

## Return Value
Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `data` | any | The fetched data (null while loading or on error) |
| `loading` | boolean | True when fetch is in progress |
| `error` | string \| null | Error message if fetch failed, null otherwise |
| `refetch` | function | Function to manually trigger a re-fetch |

## Usage Examples

### Basic Usage
```javascript
import useFetch from '../hooks/useFetch';

function PostList() {
  const { data: posts, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### With Dynamic URL
```javascript
function PostDetail() {
  const { postId } = useParams();
  
  const { data: post, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  // Component rendering logic...
}
```

### Multiple Fetches in One Component
```javascript
function PostDetail() {
  const { postId } = useParams();
  
  // Fetch post data
  const {
    data: post,
    loading: postLoading,
    error: postError
  } = useFetch(`https://api.example.com/posts/${postId}`);
  
  // Fetch comments separately
  const {
    data: comments,
    loading: commentsLoading,
    error: commentsError
  } = useFetch(`https://api.example.com/posts/${postId}/comments`);
  
  const loading = postLoading || commentsLoading;
  const error = postError || commentsError;

  // Component rendering logic...
}
```

### With Manual Refetch
```javascript
function UserData() {
  const { data, loading, error, refetch } = useFetch(
    'https://api.example.com/user/profile'
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      
      <button onClick={refetch}>Refresh Data</button>
    </div>
  );
}
```

## How It Works

### 1. Initial State
When the component mounts, the hook initializes with:
- `data: null`
- `loading: true`
- `error: null`

### 2. Fetching Phase
The hook automatically triggers a fetch when:
- Component mounts
- URL changes

During fetch:
- `loading: true`
- Previous error is cleared

### 3. Success State
On successful fetch:
- `data: <fetched data>`
- `loading: false`
- `error: null`

### 4. Error State
On fetch failure:
- `data: null`
- `loading: false`
- `error: <error message>`

## Flow Diagram
```
Component Mount
      ↓
   [url provided?]
    ↙        ↘
  Yes        No
   ↓          ↓
loading=true  loading=false
   ↓
Fetch Data
   ↓
[Success?]
 ↙      ↘
Yes      No
 ↓        ↓
data=result  error=message
loading=false loading=false
```

## Benefits

### ✅ Code Reusability
- Single hook for all data fetching needs
- Eliminates repetitive useEffect + fetch code
- DRY principle applied

### ✅ Consistent Error Handling
- Standardized error management
- Consistent loading states across app
- Better user experience

### ✅ Cleaner Components
- Components focus on UI logic
- Data fetching abstracted away
- Easier to read and maintain

### ✅ Automatic Dependency Management
- Re-fetches when URL changes
- No manual dependency array management
- Prevents stale data

### ✅ Easy Testing
- Hook can be tested independently
- Components easier to mock
- Better unit test coverage

## Implementation Details

### State Management
```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### Effect Hook
```javascript
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [url]); // Re-run when URL changes
```

## Best Practices

### ✅ DO
- Use descriptive variable names when destructuring: `const { data: posts, loading, error }`
- Always check loading and error states before rendering data
- Combine multiple loading states when using multiple fetches
- Provide user feedback for all states (loading, error, success)

### ❌ DON'T
- Don't forget to handle error cases
- Don't assume data is always available
- Don't call refetch in a loop (will cause infinite re-renders)
- Don't use without null checks on data

## Real-World Applications

### Current Implementation
1. **PostList.jsx** - Fetches list of blog posts
2. **PostDetail.jsx** - Fetches individual post and its comments

### Potential Extensions
- Add request cancellation (AbortController)
- Implement caching mechanism
- Add request debouncing
- Support for POST/PUT/DELETE methods
- Pagination support
- Retry logic on failure

## Performance Considerations

- Hook automatically re-fetches when URL changes
- Each component instance maintains its own fetch state
- No built-in caching (could be added as enhancement)
- Suitable for small to medium applications

## Related Files
- Hook implementation: [src/hooks/useFetch.js](../src/hooks/useFetch.js)
- Usage example 1: [src/pages/PostList.jsx](../src/pages/PostList.jsx)
- Usage example 2: [src/pages/PostDetail.jsx](../src/pages/PostDetail.jsx)
