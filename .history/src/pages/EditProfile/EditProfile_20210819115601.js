import { Link, Redirect, useHistory } from "react-router-dom";
import { Formik } from "formik";
import React, { useEffect, useState, useContext } from "react";
import { Avatar } from "@material-ui/core";
import TextInput from "../../components/TextInput/TextInput";
import { getUserProfile, updateProfile } from "../../lib/getProfile";

import { useSelector } from "react-redux";
import BackIcon from "@material-ui/icons/KeyboardBackspace";

import ScheduleIcon from "@material-ui/icons/CalendarToday";

import LoggedInUserContext from "../../context/logged-in-user";
import UserContext from "../../context/user";
import {
  BodyItem,
  ImageBodyItem,
  ImageLabel,
  Image,
  BodyMeta,
  ImageMeta,
  BodyUsername,
  ImageInput,
  Label,
  InputLabel,
  AuthForm,
  Input,
  InputDesc,
  InputArea,
  DescHeader,
  Button,
  ImageLoader,
} from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import useUser from "../../hooks/use-user";
import { db } from "../../lib/firebase";
import { MillToDate } from "../../utils/MillToDate";
import BottomSidebar from "../../components/BottomSidebar/BottomSidebar";
import Feed from "../../components/Feed/Feed";
import HomeBox from "../../components/HomeBox/HomeBox";
import Loading from "../../components/Loading/Loading";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import CommentIcon from "../../components/icons/CommentIcon";
import FavoriteIcon from "../../components/icons/FavoriteIcon";
import RetweetIcon from "../../components/icons/RetweetIcon";
import SharePostIcon from "../../components/icons/SharePostIcon";
import FriendSuggestions from "../../components/Widgets/FriendSuggestions/FriendSuggestions";
import Links from "../../components/Widgets/Links/Links";
import SearchInput from "../../components/Widgets/SearchInput/SearchInput";
import Topics from "../../components/Widgets/Topics/Topics";

const Profile = (username, fullName) => {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);

  const [ setFullName] = useState("");
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
  const [isVisibleProfileCard, setIsVisibleProfileCard] = React.useState(false);
  let history = useHistory();

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Email address is invalid";
    }
  
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password too short";
    }
  
    return errors;
  };const initialValues = {
    email: "",
    fullName: "",
    username: "",
    bio: "",
    website: "",
    phone: "",
  };
  const handleProfileUpdate = (e) => {
    setFormLoading(true);
    e.preventDefault();
    const data = {
      email,
      fullName,
      username,
      bio,
      website,
      phone,
    };
    updateProfile(user?.fullName, data)
      .then((msg) => {
        setFormLoading(false);
        setMessage(msg);
      })
      .catch((error) => {
        setFormLoading(false);
        setMessage(error.message);
      });
  };

  useEffect(() => {
    getUserProfile(user?.uid)
      .then((doc) => {
        setFullName(doc.data().fullName);
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
  document.title = user?.fullName + "/ FireLucent";
  const [loading, setLoading] = React.useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <HomeBox>
      <section className="feed">
        <div className="profileHeader">
          <div onClick={() => history.goBack()}>
            <BackIcon />
          </div>
          <div>
            <span>{user?.fullName}</span>
          
          </div>
        </div>
        <div className="profile">
          <div className="editProfileTitle">
            <div className="editProfileImage">
              <img src={user?.photoURL} />
            </div>{" "}
            <ImageLabel>
              {imageLoading && (
                <ImageLoader>
                  <ReactLoading
                    width="1.2rem"
                    height="1.2rem"
                    color="#000000"
                    type="spokes"
                  />
                </ImageLoader>
              )}
            </ImageLabel>
          </div>
          <div className="profileBiography">
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleProfileUpdate}
            >
              {(formik) => {
                const {
                  values,
                  handleChange,
                  handleSubmit,
                  errors,
                  touched,
                  handleBlur,
                  isValid,
                  dirty,
                } = formik;
                return (
                  <form onSubmit={(e) => handleProfileUpdate(e)}>
                    {" "}
                    <>
                      <>
                        <h4
                          style={{
                            margin: "0",
                          }}
                          className="spanText"
                        >
                     </h4>
                      </>
     {user?.username}                        
                      <div>
                    
                        <h4
                          style={{
                            margin: "0",
                          }}
                        >
                          Full Name
                        </h4>

                       <TextInput
                          placeholder={user?.fullName}
                          fullWidth
                          id="fullName"
                          onBlur={(e) => setFullName(e.currentTarget.value)}
                          value={user?.fullName && user?.fullName}
                        />
                        <TextInput
                          placeholder={user?.username}
                          fullWidth
                          id="username"
                          onBlur={(e) => setUsername(e.currentTarget.value)}
                          value={user?.username && user?.username}
                        />
                      </div>

                      <h4
                        style={{
                          margin: "0",
                        }}
                        className="spanText"
                      >
                        Website
                      </h4>

                      <TextInput
                        placeholder={website}
                        fullWidth
                        id="website"
                        value={website && website}
                        onChange={(e) => setWebsite(e.currentTarget.value)}
                      />
                    </>
                    <h4
                      style={{
                        margin: "0",
                      }}
                      className="spanText"
                    >
                      Bio{" "}
                    </h4>
                    <TextInput
                      multiline
                      fullWidth
                      placeholder={bio}
                      id="bio"
                      value={bio && bio}
                      rows="7"
                      onBlur={(e) => setBio(e.currentTarget.value)}
                    />
                    <h3>Personal Information</h3>
                    <span className="spanText">
                      Provide your personal information, even if the account is
                      used for a business, a pet or something else. This won't
                      be a part of your public profile.
                    </span>
                    <span htmlFor="email">Email</span>
                    <TextInput
                      fullWidth
                      id="email"
                      value={email && email}
                      placeholder={email}
                      onBlur={(e) => setEmail(e.currentTarget.value)}
                    />
                    <div>
                      <span htmlFor="phone">Phone Number</span>
                    </div>
                    <TextInput
                      fullWidth
                      id="phone"
                      value={phone && phone}
                      placeholder={phone}
                      onBlur={(e) => setPhone(e.currentTarget.value)}
                    />
                    <button
                      className="defaultBtn"
                      disabled={formLoading}
                      type="submit"
                    >
                      Submit
                    </button>
                    <br />
                    <br />
                  </form>
                );
              }}
            </Formik>

            <BottomSidebar />
          </div>
        </div>
      </section>
    </HomeBox>
  );
};

export default Profile;
