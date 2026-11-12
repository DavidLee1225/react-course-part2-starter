import axios from "axios";
import { useEffect, useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;

  const { data, error, fetchNextPage, isFetchingNextPage } = usePosts({
    pageSize,
  });

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {data?.pages.map((page) => (
          <>
            {page?.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </>
        ))}
      </ul>
      <button
        onClick={() => fetchNextPage()}
        className="btn btn-primary my-3"
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "more"}
      </button>
    </>
  );
};

export default PostList;
