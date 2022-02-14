import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import ReactLoader from "./components/loader";
import * as ROUTES from "./constants/ro utes";
import UserContext from "./context/user";
import HomeBox from "./components/HomeBox/HomeBox";
import useAuthListener from "./hooks/use-auth-listener";
import { AuthProvider, useAuth } from "./contexts/AuthContext.js";
import ProtectedRoute from "./helpers/protected-route";
import { RouterRounded } from "@material-ui/icons";
import { auth, db } from "./lib/firebase";
import { PostProvider } from "./context/Post";
import Router from "./routes/Router";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const EditProfile = lazy(() => import("./pages/EditProfile/EditProfile"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileSkeleton = lazy(() => import("./pages/ProfileSkeleton"));
const NotFound = lazy(() => import("./pages/not-found"));
const Test = lazy(() => import("./pages/Test.js"));

export default function App() {
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useAuthListener();

  const [username, setUsername] = useState("");

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
    <AuthProvider>
      <PostProvider>
        <UserContext.Provider value={{ user }}>
          <Router />
        </UserContext.Provider>
      </PostProvider>
    </AuthProvider>
  );
}
