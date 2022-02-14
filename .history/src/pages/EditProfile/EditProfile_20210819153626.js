import { Link, Redirect, useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { getUserProfile, updateProfile } from "../../lib/getProfile";

import UserContext from "../../context/user";

import { useAuth } from "../../contexts/AuthContext";
import useUser from "../../hooks/use-user";
import { MillToDate } from "../../utils/MillToDate";
import dayjs from "dayjs";

const Profile = (username, fullName) => {
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

  return (
    <>
      {user?.emailAddress} <br />
      {user?.username} <br />
      {dayjs(user?.dateCreated).format("MMMM, DD, YYYY")}<br />
      {user?.followers} followers <br />
      {user?.following} <br />
      {user?.avatar} <br />
      {user?.photoUrl} <br />
      {user?.fullname} <br />
    </>
  );
};

export default Profile;
