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
import dayjs from "dayjs";
import BottomSidebar from "../components/BottomSidebar/BottomSidebar";
import HomeBox from "../components/HomeBox/HomeBox";
import Feed from "../components/Feed/Feed";
import { SettingsIcon } from "../components/icons";
import Loading from "../components/Loading/Loading";
import Post from "../components/Feed/Post/Post";
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
import { MillToDate } from "../utils/MillToDate";
import { date } from "yup";
import moment from "moment";
import { DEFAULT_IMAGE_PATH } from "../constants/paths";
import { useAuth } from "../contexts/AuthContext";

export default function Profile(props) {
  const { updateProfileImage } = useAuth();
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
  document.title = "Profile  / FireLucent";
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

  return user?.username ? (
    <HomeBox>
      <section className="feed">
        <div className="">
          <div>
            <div className="feed-header">
              <div onClick={() => setIsDrawerBar(true)}>
                <Avatar src={user?.avatar} />
              </div>
              <div className="feed-headerText">
                <span>Profile</span>
              </div>
              <div className="homeColumn"></div>
            </div>
          </div>
        </div>
        <div className="profile">
          <div className="backgroundImage"></div>
          <div className="profileTitle">
            <div className="profileImage">
              <Avatar src={user?.photoUrl} />
            </div>
            <div className="editProfile">
              <span>Edit Profile</span>
            </div>
          </div>
          <div className="profileBiography">
            <span>{user?.fullname}</span>
            <span>@{user?.username}</span>
            <span>{user?.bio}</span>
            <span>
              <ScheduleIcon style={{ fill: "var(--username)" }} />
              <span>Joined {dayjs(user?.dateCreated).format("MMMM, DD, YYYY")}</span>
            </span>
          </div>
          <div>
            <span>
              <span>{user?.followers} </span>
              <span>Following</span>
            </span>
            <span>
              <span>{user?.following} </span>
              <span>Followers</span>
            </span>
          </div>
          <div className="">
            <article className="">
              {" "}
              {!loading ? (
                      <Post  />
              ) : (
                <Loading />
              )}
            </article>
          </div>
        </div>
        <BottomSidebar />
      </section>
      <div className="widgets"></div>
    </HomeBox>
  ) : null;
}
