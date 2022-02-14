import React, { useEffect, useState } from "react";
import {
  AnalyticsIcon,
  DisplayIcon,
  HelpIcon,
  MomentsIcon,
  NewslettersIcon,
  SettingsIcon,
  TopicsIcon,
  LogoutIcon,
} from "./icons";
import MoreMenuItem from "./MoreMenu/MoreMenuItem/MoreMenuItem";
import useUser from "../hooks/use-user";

import { useAuth } from "../contexts/AuthContext";

import { useContext } from "react";
import UserContext from "../context/user";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../lib/firebase";
import { Button } from "@material-ui/core";
const MoreMenu = ({ active }) => {
  const history = useHistory();

  const handleSignout = () => {
    signout();
    history.push("/accounts/signin");
  };

  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const { signout, currentUser } = useAuth();
  useEffect(() => { }, [currentUser]);

  return (
    <div className={active ? "moreMenu" : "unVisible"}>
      <div
        className=""
        style={{
          marginLeft: "50px",
        }}
      ></div>
      <Link className="moreMenuItem" to={user?.username}>
        <LogoutIcon />
        <Button className="logout__container" onClick={handleSignout}>
          Logout
        </Button>

        <span className="moreMenuText">Log out of @{user?.username} </span>
      </Link>
    </div>
  );
};

export default MoreMenu;
