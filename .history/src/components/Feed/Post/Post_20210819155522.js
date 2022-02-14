import { Link, Redirect, useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../../context/user";
import useUser from "../../../hooks/use-user";
import { useAuth } from "../../../contexts/AuthContext";

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

  return (
    <>
      {user?.username}
      {user?.emailAddress}
   </>  
  );
};

export default Post;
 