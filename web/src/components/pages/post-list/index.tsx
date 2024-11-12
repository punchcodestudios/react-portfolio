import { useState } from "react";
import usePosts from "../../../hooks/usePosts";

const PostList = () => {
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState<number>(0);
  const pageSize = 5;
  const {
    data: posts,
    isLoading,
    error,
  } = usePosts({
    userId: userId,
    page,
    pageSize,
  });

  if (isLoading) return <p>...loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        onChange={(event) => setUserId(parseInt(event.target.value))}
        className="form-select mb-3"
      >
        <option value="">Please Select</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <div className="row mt-5">
        <div className="col-md-3">
          <button
            disabled={page === 1}
            className="btn btn-primary"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        </div>
        <div className="col-md-3 ms-3 me-3">{`Page: ${page}`}</div>
        <div className="col-md-3">
          <button
            disabled={page === 5}
            className="btn btn-primary"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PostList;
