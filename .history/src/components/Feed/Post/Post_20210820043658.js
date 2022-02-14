import React, { useState, useContext, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./Post.css";
import FavoriteIcon from "../../icons/FavoriteIcon";
import CommentIcon from "../../icons/CommentIcon";
import RetweetIcon from "../../icons/RetweetIcon";
import SharePostIcon from "../../icons/SharePostIcon";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { MillToDate } from "../../../utils/MillToDate";
import ProfileCard from "../../ProfileCard/ProfileCard";
import firebase from "firebase";

function Post({ userimage, displayName, text, shareImage, date }) {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        const lists = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLists(lists);
      });
  }, []);
  const [isVisibleProfileCard, setIsVisibleProfileCard] = React.useState(false);
  return (
    <>
      {lists.map((list) => {
        return (
          <div
            className="post"
            onMouseLeave={() => setIsVisibleProfileCard(false)}
          >
            <ProfileCard active={isVisibleProfileCard && true} />
            <div>
              <Avatar src={userimage} />
            </div>
        
       
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
                {displayName}
              </span>
              <span className="post-header-username">{"@" + list.username}</span>
              <span className="post-header-date">{MillToDate(list.date)}</span>
              <MoreHorizIcon className="postMoreIcon" />
            </div>
            <div className="post-content">{text}</div>
         {" "}
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
        );
      })}
    </>
  );
}

export default Post;
