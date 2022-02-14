import { useRef, useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { Logo } from "../components/icons";
import * as yup from "yup";

import { TextField } from "@material-ui/core";
import TextInput from "../components/TextInput/TextInput";
import { Formik } from "formik";
import { useAuth } from "../contexts/AuthContext";
export default function Login() {
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
  };
  const handleSignin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signin(email, password)
      .then((id) => {
        setLoading(false);
        history.push(`/home`);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const initialValues = {
    email: "",
    password: "",
  };
    const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  const { signin, facebookLogin } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - FireLucent";
  }, []);

  return (
    <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={handleSignin}
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
        <div className="container">
          <div className="panel">
            <div className="panelHeader">
              <Logo width={39} fill="white" />
              <span className="panelHeaderText">Log in</span>

              <form onSubmit={(e) => handleSignin(e)}>
                <TextInput
                  name="email"
                  inputPlaceholder="Mobile Number or Email"
                  autoFocus
                  inputType="email"
                  label="Mobile Number or Email"
                  inputRef={emailRef}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                formHelperText="Email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }

                  inputRequired={true}
                />{" "}
                {errors.email && touched.email && (
                  <span className="error">{errors.email}</span>
                )}
                <TextInput
                  name="password"
                  inputPlaceholder="Password"
                  type="password"
                  label="Password"
                  value={values.password}
                  inputRef={passwordRef}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputRequired={true}
                />{" "}
                {errors.password && touched.password && (
                  <span className="error">{errors.password}</span>
                )}
                <div className=""></div>
                {error && (
                  <span className="error">Incorrect email or password</span>
                )}{" "}
                <br />
                <button className="defaultBtn">Sign in</button>
                <div className="loginLinks">
                  <Link to="/">
                    <span className="link">Forgot password?</span>
                  </Link>{" "}
                  <span> {" · "} </span>
                  <Link to="/signup">
                    <span className="link">Create an account </span>
                  </Link>
                  <div className="signUp">
                    <p className="spanText">
                      By signing up, you are agree that you are an awesome
                      person. 💖🔥
                    </p>
                  </div>{" "}
                </div>{" "}
              </form>
            </div>{" "}
          </div>
        </div>
      );
    }}
  </Formik>
  );
}
