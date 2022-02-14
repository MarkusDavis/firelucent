import { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/Sidebar";
import Timeline from "../components/timeline";
import useUser from "../hooks/use-user";
import LoggedInUserContext from "../context/logged-in-user";
import HomeBox from "../components/HomeBox/HomeBox";
import Feed from "../components/Feed/Feed";
import Widgets from "../components/Widgets/Widgets";
import TweetBox from "../components/Feed/TweetBox/TweetBox";
import DrawerBar from "../components/DrawerBar/DrawerBar";
import { Avatar } from "@material-ui/core";
import { HomeStars, SettingsIcon } from "../components/icons";
import { useAuth } from "../contexts/AuthContext";
import React from "react";
import { useSelector } from "react-redux";
import Post from "../components/Feed/Post/Post";
import PostModal from "../components/PostModal";
import { db } from "../lib/firebase";
import ProfileCard from "../components/ProfileCard/ProfileCard";

export default function Home({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = "Firelucent";
  }, []);
  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { signout, currentUser } = useAuth();
  const { posts } = useSelector((state) => state).posts;
  const [marks, setMarks] = React.useState();

  useEffect(() => {
    db.collection("Marks")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMarks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, [marks]);
useEffect(() => {
  {
    db.collection("restaurants").doc("123").collection("reviews").get()
.then(querySnapshot => {
    querySnapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
    });
});
  }
}, [])
  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <HomeBox>
        <section className="feed">
          {isDrawerBar && (
            <div
              onClick={() => setIsDrawerBar(false)}
              className="drawerBarPanel"
            />
          )}
          <DrawerBar active={isDrawerBar} />
          <div className="feed-header">
            <div onClick={() => setIsDrawerBar(true)}>
              <Avatar src={user?.photoUrl} />
            </div>
            <div className="feed-headerText">
              <span>Home</span>
            </div>
            <div className="homeColumn">
              <SettingsIcon className="homeIcon" width={22} height={22} />
            </div>
          </div>
          <TweetBox />
        
          <Feed />
           </section>
      </HomeBox>
    </LoggedInUserContext.Provider>
  );
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
};
