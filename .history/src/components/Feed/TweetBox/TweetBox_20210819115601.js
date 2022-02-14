import React, { useState, useContext, useEffect } from "react";
import "./TweetBox.css";
import { Avatar } from "@material-ui/core";
import PhotoIcon from "../../icons/PhotoIcon";
import GifIcon from "../../icons/GifIcon";
import SurveyIcon from "../../icons/SurveyIcon";
import EmojiIcon from "../../icons/EmojiIcon";
import PlanIcon from "../../icons/PlanIcon";
import { useDispatch } from "react-redux";
import { addTweetAction } from "../../../store/actions/postActions";
import { db } from "../../../lib/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { getUserProfile } from "../../../lib/getProfile";
import useUser from "../../../hooks/use-user";
import LoggedInUserContext from "../../../context/logged-in-user";
import firebase from "firebase";
import TextInput from "../../TextInput/TextInput";

  function TweetBox() {
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
    const [user, setUser] = useState(null);

    useEffect(() => {
      getUserProfile(user)
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
    const sendTweet = (event) => {
      event.preventDefault();
      db.collection("posts").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        displayName: "",
        username : "",
        verified: true,
        text: tweetMessage,
        image: tweetImage,
        date: Date.now(),
      });
      setTweetMessage("");
      setTweetImage("");
    };
  
    return (
      <>
        <form onSubmit={sendTweet} className="tweetBox">
          <div
            style={{
              paddingInline: "15px",
            }}
          >
            <div className="tweetbox-input-row">
              <TextInput
                fullWidth
                onChange={(event) => setTweetMessage(event.target.value)}
                value={tweetMessage}
                type="text"
                placeholder="What's new in the world?"
              />
            </div>
            <div className="tweetboxRow">
              <div className="tweetboxOptions">
                <PhotoIcon
                  className="tweetboxOptionIcon"
                  width={22}
                  height={22}
                  onClick
                />
                <GifIcon className="tweetboxOptionIcon" width={22} height={22} />
                <SurveyIcon
                  className="tweetboxOptionIcon"
                  width={22}
                  height={22}
                />
                <EmojiIcon
                  className="tweetboxOptionIcon"
                  width={22}
                  height={22}
                />
                <PlanIcon className="tweetboxOptionIcon" width={22} height={22} />
              </div>
              <button type="submit" className="tweetbox-button">
                Post 🔥
              </button>
            </div>{" "}
          </div>{" "}
        </form>
      </>
    );
  }
  
  export default TweetBox;
  