import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import { getUserProfile } from "../lib/getProfile";
import firebase from "firebase";
import TextInput from "./TextInput/TextInput";

export default function FormDialog(user, id, post, photoUrl) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);  const [posts, setPosts] = useState(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
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
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <form onSubmit={sendTweet} className="tweetBox">
          <TextInput
                fullWidth
                onChange={(event) => setTweetMessage(event.target.value)}
                value={tweetMessage}
                type="text"
                placeholder="What's new in the world?"
              /></form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
