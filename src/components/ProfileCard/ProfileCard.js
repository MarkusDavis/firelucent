import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import { VerifiedIcon } from "../icons";
import "./ProfileCard.css";

import useUser from "../../hooks/use-user";

import { useAuth } from "../../contexts/AuthContext";

import { useContext } from "react";

import UserContext from "../../context/user";
import { db } from "../../lib/firebase";
const ProfileCard = ({ avatar, active, username }) => {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isVisible, setIsVisible] = React.useState(false);
  const [posts, setPosts] = React.useState();

  useEffect(() => {
    db.collection("insta")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, [posts]);
  
  return (
    <div
      className={
        active || isVisible ? "profileDetailCard" : "profileDetailCardActive"
      }

      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div>s
        <Avatar src={user?.avatar} />
   s     <div>
          <span>Follow</span>
        </div>
      </div>
      <div>
        <span>{user?.fullname}</span>
      </div>aa
      <div>
        <span>{user?.username}</span>
      </div>
      <div>
      <span>{user?.bio}</span>
      </div>
      <div>
        <span>
          <span>{user?.following} </span>

          <span>Following</span>
        </span>
        <span>
          <span>{user?.followers} </span>
          <span>Followers</span>
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
