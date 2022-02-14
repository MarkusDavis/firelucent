import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import React, { useEffect, useState } from "react";

import firebase from "firebase";

import { auth, db } from "../../../lib/firebase";

function Post({ postId, user, username, caption, imageUrl, avatar }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentVisible, setToggleComment] = useState(false);

  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);

  const addLike = () => {
    db.collection("Posts").doc(postId).collection("likes").add({
      username: user.displayName,
    });
  };

  const deleteLike = () => {
    const dataRef = db
      .collection("Posts")
      .doc(postId)
      .collection("likes")
      .where("username", "==", user.displayName);
    dataRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  };

  const toggleComment = () => {
    setToggleComment(!commentVisible);
  };

  const toggleLike = () => {
    if (like) {
      deleteLike();
      setLike(false);
    } else {
      addLike();
      setLike(true);
    }
  };

  useEffect(() => {
    if (postId) {
      db.collection("Posts")
        .doc(postId)
        .collection("likes")
        .where("username", "!=", "testing_user_notallowed")
        .onSnapshot((snapshot) => {
          setLikes(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [postId]);
  useEffect(() => {
    if (postId) {
      db.collection("Posts")
        .doc(postId)
        .collection("comments")
        .where("timestamp", "!=", -1)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [postId]);
  useEffect(() => {
    if (user) {
      const dataRef = db
        .collection("Posts")
        .doc(postId)
        .collection("likes")
        .where("username", "==", user.displayName);
      dataRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          setLike(true);
        });
      });
    } else {
      setLike(false);
    }
  }, [postId, user]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("Posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
    setToggleComment(true);
  };

  return (
    <>
      <div className="post__header">
        <Avatar className="post__avatar" alt={username} src={avatar} />
      </div>

      <img className="postImage" src={imageUrl} alt="" />
      {user && (
        <div className="post__likes">
          <div className="post__likes__likes">
            {like ? (
              <IconButton onClick={toggleLike}>
                <FavoriteRoundedIcon
                  style={{ marginLeft: "5px", color: "red" }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={toggleLike}>
                <FavoriteBorderRoundedIcon style={{ marginLeft: "5px" }} />
              </IconButton>
            )}

            <strong>{likes.length}</strong>
          </div>
          <div className="post__likes__comments">
            {commentVisible ? (
              <IconButton onClick={toggleComment}>
                <ChatBubbleRoundedIcon />
              </IconButton>
            ) : (
              <IconButton onClick={toggleComment}>
                <ChatBubbleOutlineRoundedIcon />
              </IconButton>
            )}

            <strong>{comments.length}</strong>
          </div>
        </div>
      )}

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      {commentVisible ? (
        <div className="post__comments">
          {comments.map((comment) => {
            return (
              <p key={comment.timestamp}>
                <strong>{comment.username}</strong>
                {comment.text}
              </p>
            );
          })}
        </div>
      ) : (
        <></>
      )}

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </>
  );
}

export default Post;
