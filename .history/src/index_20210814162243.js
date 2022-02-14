import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";
import "./App.css";
import { store } from "./store/store";
import { freeze } from "@reduxjs/toolkit";

ReactDOM.render(
  <Provider store={store}> <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
   
  </FirebaseContext.Provider> </Provider>,
  document.getElementById("root")
);
