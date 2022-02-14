import { Avatar, TextField } from "@material-ui/core";
import { Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ScheduleIcon from "@material-ui/icons/CalendarToday";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

import BottomSidebar from "../components/BottomSidebar/BottomSidebar";
import HomeBox from "../components/HomeBox/HomeBox";
import Feed from "../components/Feed/Feed";
import { SettingsIcon } from "../components/icons";
import Loading from "../components/Loading/Loading";
import Post from "../components/post";
import SimpleTabs from "../components/ProfileTabs";
import ProfileTabs from "../components/ProfileTabs";
import SearchInput from "../components/Widgets/SearchInput/SearchInput";
import { TabPanel } from "./TabPanel";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import { getUserProfile } from "../hooks/use-user";
import Header from "../components/post/header";

export default function SimpleContainer(props) {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [value, setValue] = React.useState(0);

  const [category, setCategory] = React.useState(1);
  const { posts } = useSelector((state) => state.posts);
  let history = useHistory();
  document.title = "Mücahit Şahin (@mucahitsahin6) / Twitter";
  const [loading, setLoading] = React.useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  return user?.username ?  (
    <HomeBox>
      <section className="feed">
        <div className="profileHeader">
          <div onClick={() => history.goBack()}>
            <BackIcon />
          </div>
          <div>
            <span>Mücahit Şahin</span>
            <span>12 Tweets</span>
          </div>
        </div>
        <div className="profile">
          <div className="backgroundImage"></div>
          <div className="profileTitle">
            <div className="profileImage">
            <Avatar src={user?.avatar}  />
            </div>
            <div className="editProfile">
              <span>Edit Profile</span>
            </div>
          </div>
          <div className="profileBiography">
            <span>Mücahit Şahin</span>
            <span>@Mucahitsahin6</span>
            <span>Junior Software Developer</span>
            <span>
              <ScheduleIcon />
              Joined December 2011
            </span>
          </div>
          <div>
            <span>
              <span>167</span>
              <span>Following</span>
            </span>
            <span>
              <span>167</span>
              <span>Followers</span>
            </span>
          </div>
          <div className="profileCategory">          </div>

          <Feed/>
          </div>
        <BottomSidebar />
      </section>
      <div className="widgets"></div>
    </HomeBox>
  ) : null;}
