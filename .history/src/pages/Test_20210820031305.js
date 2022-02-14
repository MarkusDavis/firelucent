import React, { useState } from "react"
import styled from "styled-components"
import firebase from "firebase"
import { Button, TextField } from "@material-ui/core"
import TextInput from "../components/TextInput/TextInput"

const AddNote = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const addNote = () => {
    firebase
      .firestore()
      .collection("notes")
      .add({
        title,
        body,
      })
    setTitle("")
    setBody("")
  }
  return (
    <div>
      <TextInput value={title} onChange={e => setTitle(e.target.value)} />
      <TextField value={body} onChange={e => setBody(e.target.value)} />
      <Button onClick={addNote}>Add Note</Button>
    </div>
  )
}
export default AddNote