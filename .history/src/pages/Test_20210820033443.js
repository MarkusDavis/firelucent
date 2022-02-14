import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { TextField } from "@material-ui/core";
import TextInput from "../components/TextInput/TextInput";
import UserContext from "../context/user";

import { useAuth } from "../contexts/AuthContext";

import useUser from "../hooks/use-user";

const AddNoteDiv = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  margin: 30px auto;
  padding: 5px;
`;
const InputTitle = styled.input`
  padding: 0.5em;
  border: none;
  background: #f4f4;
  margin-bottom: 10px;
  border-radius: 3px;
`;
const BodyTextArea = styled.textarea`
  padding: 0.5em;
  border: none;
  height: 80px;
  background: #f4f4;
  margin-bottom: 10px;
  border-radius: 3px;
`;
const Button = styled.div`
  background: blue;
  color: white;
  font-size: 1em;
  padding: 10px;
  cursor: pointer;
  border-radius: 3px;
`;
const AddNote = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const addNote = () => {
    firebase.firestore().collection("users/userId/books").add({
      title,
      body,
    });
    setTitle("");
    setBody("");
  };

  return (
    <div>
      {user.username}
      <InputTitle value={title} onChange={(e) => setTitle(e.target.value)} />
      <InputTitle value={body} onChange={(e) => setBody(e.target.value)} />
      <Button onClick={addNote}>{user?.emailAddress}</Button> 
    </div>
  );
};
export default AddNote;
