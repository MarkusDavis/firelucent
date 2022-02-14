import React, { useEffect, useState } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox/TweetBox";
import HomeStars from "../icons/HomeStars";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import DrawerBar from "../DrawerBar/DrawerBar";
import Loading from "../Loading/Loading";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { getUserProfile } from "../../lib/getProfile";
import Post from "../Feed/Post/Post";

function Feed(user, photoUrl, id, post) {
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);
  const [posts, setPosts] = useState(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const { updateProfileImage } = useAuth();
  const [imageLoading, setImageLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fullname, setFullName] = useState();
  const [username, setUsername] = useState();
  const [website, setWebsite] = useState();
  const [bio, setBio] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    getUserProfile(user?.uid)
      .then((doc) => {
        setFullName(doc.data().fullname);
        setUsername(doc.data().username);
        setWebsite(doc.data().website);
        setBio(doc.data().bio);
        setEmail(doc.data().email);
        setPhone(doc.data().phone);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [message]);
  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return (
    <section className="feed">
      {isDrawerBar && (
        <div onClick={() => setIsDrawerBar(false)} className="drawerBarPanel" />
      )}
      <DrawerBar active={isDrawerBar} />
      <div className="feed-header">
        <div onClick={() => setIsDrawerBar(true)}>
          <Avatar src="https://avatars.githubusercontent.com/u/38807255?s=460&u=deb087d587be7f6a4000e4e710ec4d1daa6fde84&v=4" />
        </div>
        <div className="feed-headerText">
          <span>Home</span>
        </div>
        <div className="homeStarsCol">
          <HomeStars className="homeStars" width={22} height={22} />
        </div>
      </div>
      <TweetBox />
      {loading ? (
        <Loading />
      ) : (
        <article>
          {posts.map((post) => (
            <Post
              key={post.id}
              username={post.username}
              userimage={post.userimage}
              date={post.date}
              displayName={post.displayName}
              text={post.text}
              shareImage={post.shareImage}
            />
          ))}
        </article>
      )}
      <BottomSidebar />
    </section>
  );
}

export default Feed;
