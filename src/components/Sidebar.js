import {
  HomeIcon,
  MessagesIcon,
  ListIcon,
  UserIcon,
  ExploreIcon,
  NotificationsIcon,
  BookmarkIcon,
  MoreIcon,
  Logo,
} from "./icons";
import TwitterIcon from "@material-ui/icons/Twitter";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Avatar } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import MoreMenu from "./MoreMenu";
import SidebarItem from "./sidebar/SidebarItem/SidebarItem";
import React, { useEffect, useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import useUser from "../hooks/use-user";

import { useAuth } from "../contexts/AuthContext";

import { useContext } from "react";

import UserContext from "../context/user";
import SetPostIcon from "./icons/SetPostIcon";

function Sidebar() {
  const { user: loggedInUser } = useContext(UserContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignout = () => {
    signout();
    history.push("/accounts/signin");
  };
  const { signout, currentUser } = useAuth();

  useEffect(() => {}, [currentUser]);

  const { user } = useUser(loggedInUser?.uid);
  const [location] = React.useState(useLocation().pathname);
  const [moreActive, setMoreActive] = React.useState(false);
  return (
    <div className="sidebar">
      <SidebarItem className="sidebaricon" Icon={Logo} />
      <Link to="/home" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Home"
          Icon={HomeIcon}
          active={location === "/home" && true}
        />
      </Link>
      <Link to="/explore" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Explore"
          Icon={ExploreIcon}
          active={location === "/explore" && true}
        />
      </Link>
      <Link to="/notifications" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Notifications"
          Icon={NotificationsIcon}
          active={location === "/notifications" && true}
        />
      </Link>
      <Link to="/messages" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Messages"
          Icon={MessagesIcon}
          active={location === "/messages" && true}
        />
      </Link>
      <Link to="/bookmarks" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Bookmarks"
          Icon={BookmarkIcon}
          active={location === "/bookmarks" && true}
        />
      </Link>
      <Link to="/lists" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Lists"
          Icon={ListIcon}
          active={location === "/lists" && true}
        />
      </Link>
      <Link to={`/p/${user?.username}`}>
        <SidebarItem text="Profile" Icon={UserIcon} />
      </Link>
      <div className="moreMenuButton">
        <SidebarItem text="More" Icon={MoreIcon} />
        <MoreMenu active={moreActive} />
        {moreActive && <div className="closeMoreMenuPanel" />}
      </div>
      <div className="tweetButton">
        <SetPostIcon className="setTweetIcon" />
        <span>Post</span>
      </div>
      <>
        <></>

        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <Link to="/">
            <MenuItem className="moreMenuItem">
              <div className="profileCardNameCol">
                <div className="profileCardNameColName">
                  <span>{user?.fullname}</span>
                </div>
                <div className="profileCardNameColuserName">
                  <span>@{user?.username} </span>
                </div>
              </div>
            </MenuItem>
            <MenuItem
              style={{ borderTop: "1px solid var(--border-color) " }}
              onClick={handleSignout}
            >
              <span>Log out of @{user?.username} </span>
            </MenuItem>
          </Link>
        </Menu>
      </>
      <div
        onClick={() => setMoreActive(!moreActive)}
        className="profileCard"
        onClick={handleClick}
      >
        <div className="profileCardImage">
          <Avatar className="avatar" src={user?.photoUrl} />
        </div>{" "}
        <div className="profileCardNameCol">
          <div className="profileCardNameColName">
            <span>{user?.fullname}</span>
          </div>
          <div className="profileCardNameColuserName">
            <spa>@{user?.username} </spa>
          </div>
        </div>
        <div className="profileCardIcon">
          <MoreHorizIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
