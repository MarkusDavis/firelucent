import React from "react";
import firebase from "firebase";

function Test() {
  firebase
    .firestore()
    .collection("books")
    .doc("another book")
    .set({
      title: "War and Peace",
    })
    .then(() => {
      console.log("Document created");
    });
  return <div></div>;
}

export default Test;
