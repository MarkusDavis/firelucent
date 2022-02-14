import React, { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";

function TweetBox() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const response = db.collection("posts");
    const data = await response.get();
    data.docs.forEach((item) => {
      setPosts([...posts, item.data()]);
    });
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="">
      {posts &&
        posts.map((post) => {
          return (
            <div className="blog-container">
              <h4>{post.title}</h4>
              <p>{post.text}</p>
            </div>
          );
        })}
    </div>
  );
}

export default TweetBox;
