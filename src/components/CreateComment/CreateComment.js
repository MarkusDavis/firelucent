import React, { useContext, useState } from 'react'
import { Box, Button, makeStyles, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { goToBooksFeed } from '../../routes/Cordinator'
import AddIcon from '@material-ui/icons/Add'
import firebase from 'firebase'
import { db } from '../../lib/firebase'
import { AuthContext } from '../../contexts/AuthContext'

function CreateComment({ item }) {
  const { id } = item

  const history = useHistory()
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)

  const [comment, setComment] = useState('')

  const handleCommentChange = e => {
    setComment(e.target.value)
  }

  const postComment = async e => {
    e.preventDefault()
    db.collection('posts')
      .doc(id)
      .collection('comments')
      .add({
        text: comment,
        username: currentUser.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(setComment(''), goToBooksFeed(history))
  }

  return (
    <>
      {currentUser ? (
        <form className={classes.form} id='postComment_form'>
          <TextField
            fullWidth
            value={comment}
            onChange={handleCommentChange}
            variant='outlined'
            size='small'
            name='comment'
            label='Comment'
          />
          <Button
            style={{
              
            }}
            type='submit'
            onClick={postComment}
            endIcon={<AddIcon style={{ fontSize: 30 }} />}
          />
        </form>
      ) : (
        <p style={{ color: 'grey', textAlign: 'center', marginBottom: '-5px' }}>
          Log in to post a comment
        </p>
      )}
    </>
  )
}

export default CreateComment

const useStyles = makeStyles({
  form: {
   
  },
})
