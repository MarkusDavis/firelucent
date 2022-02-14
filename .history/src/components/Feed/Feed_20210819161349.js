import { Link, Redirect, useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { getUserProfile, updateProfile } from "../../lib/getProfile";
import "./Feed.css";

import UserContext from "../../context/user";
import TweetBox from "./TweetBox/TweetBox";
import Post from "./Post/Post";
import HomeStars from "../icons/HomeStars";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import DrawerBar from "../DrawerBar/DrawerBar";
import Loading from "../Loading/Loading";

import { useAuth } from "../../contexts/AuthContext";
import useUser from "../../hooks/use-user";
import { MillToDate } from "../../utils/MillToDate";
import dayjs from "dayjs";

const Feed = (username, fullName) => {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [setFullName] = useState("");
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const { currentUser } = useAuth();
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
  const { posts } = useSelector((state) => state).posts;
  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return (
    <section className="">
    {isDrawerBar && (
      <div onClick={() => setIsDrawerBar(false)} className="drawerBarPanel" />
    )}
    <DrawerBar active={isDrawerBar} />
    <div className="">
    
    </div>
    {loading ? (
      <Loading />
    ) : (
      <article>
        {posts.map((post) => (
          <Post
            key={post.id}
            username={user.username}
            userimage={user.avatar}
            date={post.date}
            displayName={user.fullname}
            text={post.text}
            shareImage={post?.shareImage}
          />
        ))}
      </article>
    )}
    <BottomSidebar />
  </section>
  );
};

export default Feed
