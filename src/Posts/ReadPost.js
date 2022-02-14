import React from "react";
import firebase from "firebase";

function Test() {
  const postsRef = firebase.firestore().collection("posts");

  postsRef.get().then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
  });
    return <>
   
    </>;
}

export default Test;
