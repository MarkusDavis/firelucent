import { Link, Redirect, useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../../context/user";
import useUser from "../../../hooks/use-user";
import { useAuth } from "../../../contexts/AuthContext";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  FavoriteIcon,
  RetweetIcon,
  CommentIcon,
  SharePostIcon,
} from "../../icons";
import { Avatar } from "@material-ui/core";
import ProfileCard from "../../ProfileCard/ProfileCard";
import { MillToDate } from "../../../utils/MillToDate";

const Post = (username, fullName) => {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [setFullName] = useState("");
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const { updateProfileImage } = useAuth();
  const [imageLoading, setImageLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState();
  const [bio, setBio] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  let history = useHistory();
  const [isVisibleProfileCard, setIsVisibleProfileCard] = React.useState(false);

  return (
    <div className="post" onMouseLeave={() => setIsVisibleProfileCard(false)}>
      <ProfileCard active={isVisibleProfileCard && true} />
      <div>
        <Avatar src={user?.avatar} />
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
            {user?.fullname}
          </span>
          <span className="post-header-username">{"@" + user?.username}</span>
          <span className="post-header-date">
            {MillToDate(user?.dateCreated)}
          </span>
          <MoreHorizIcon className="postMoreIcon" />
        </div>
        <div className="post-content">{user?.text}</div>
        {user?.shareImage && (
          <div className="post-image">
            <img src={user?.shareImage} alt="shareimage" />
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
  );
};

export default Post;
