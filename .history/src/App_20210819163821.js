import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactLoader from "./components/loader";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import HomeBox from "./components/HomeBox/HomeBox";
import useAuthListener from "./hooks/use-auth-listener";
import { AuthProvider, useAuth } from "./contexts/AuthContext.js";
import ProtectedRoute from "./helpers/protected-route";
import { RouterRounded } from "@material-ui/icons";
import { auth, db } from "./lib/firebase";
import { PostProvider } from "./context/Post";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const EditProfile = lazy(() => import("./pages/EditProfile/EditProfile"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileSkeleton = lazy(() => import("./pages/ProfileSkeleton"));
const NotFound = lazy(() => import("./pages/not-found"));

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
          <Router>
            <Suspense fallback={<ReactLoader />}>
              <Switch>
                <Route path={ROUTES.LOGIN} component={Login} />
                <Route path={ROUTES.SIGN_UP} component={SignUp} />
                <Route path={ROUTES.EDITPROFILE} component={EditProfile} />
                <Route path={ROUTES.PROFILE} component={Profile} />
                <Route
                  path={ROUTES.PROFILESKELETON}
                  component={ProfileSkeleton}
                />
                <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                  <Home />
                </ProtectedRoute>

                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </Router>
        </UserContext.Provider>
      </PostProvider>
    </AuthProvider>
  );
}
