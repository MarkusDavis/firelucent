import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import firebase from "firebase";

import { auth, db } from "../lib/firebase";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import { CommentIcon, FavoriteIcon, RetweetIcon, SharePostIcon } from "../components/icons";
import { MillToDate } from "../utils/MillToDate";

function Post({ postId, user, username, caption, imageUrl, date }) {
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
      .where("username", "==", user.fullname);
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
  const [isVisibleProfileCard, setIsVisibleProfileCard] = React.useState(false);

  return (
    <>
      <div className="post" onMouseLeave={() => setIsVisibleProfileCard(false)}>
      <ProfileCard active={isVisibleProfileCard && true} />
      <div>
        <Avatar src={user.avatar} />
      </div>
      <div className="post-content-col">
        <div className="post-header">
          <span
            className="post-header-displayname"
            onMouseEnter={() => setIsVisibleProfileCard(true)}
            onMouseLeave={() => {
              setTimeout(function () {
                setIsVisibleProfileCard(false);
              }, 1000);
            }}
          >
            {user.displayName}
          </span>
          <span className="post-header-username">{"@" + username}</span>ss
          <span className="post-header-date">{MillToDate(date)}</span>
          <MoreHorizIcon className="postMoreIcon" />
        </div>
        <div className="post-content">{caption}</div>
        {imageUrl && (
          <div className="post-image">
            <img src={imageUrl} alt="shareimage" />
          </div>
        )}
        <div className="post-event">
          <div>
            <CommentIcon className="postIcon" />
            <span>5</span>
          </div>
          <div>
            <FavoriteIcon className="postIcon" />
            <span>5</span>
          </div>
          <div>
            <RetweetIcon className="postIcon" />
            <span>5</span>
          </div>
          <div>
            <SharePostIcon className="postIcon" />
          </div>
        </div>
      </div>
      </div>
      </>
  );
}

export default Post;
