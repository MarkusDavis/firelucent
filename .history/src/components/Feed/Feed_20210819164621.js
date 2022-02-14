import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { getUserProfile, updateProfile } from "../../lib/getProfile";
import "./Feed.css";

import UserContext from "../../context/user";
import TweetBox from "./TweetBox/TweetBox";
import Post from "./Post/Post";
import HomeStars from "../icons/HomeStars";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import { useSelector } from "react-redux";
import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import DrawerBar from "../DrawerBar/DrawerBar";
import Loading from "../Loading/Loading";

import { useAuth } from "../../contexts/AuthContext";
import useUser from "../../hooks/use-user";
import { MillToDate } from "../../utils/MillToDate";
import dayjs from "dayjs";
import { PostContext } from "../../context/Post";
import PostCard from "./PostCard";

const Feed = (username, fullName) => {
  let { id } = useParams();

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
  const { posts } = useContext(PostContext);
  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return !!currentUser ? (
    <section className="feed">
      <div className="post-content">
        {posts.length > 0 ? (
          posts.map((item) => <PostCard key={item.id} item={item} />)
        ) : (
          <> </>
        )}
      </div>
    </section>
  ) : (
    <section className="feed">
      <div className="post-content">
        {posts.map((item) => (
          <PostCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Feed;
