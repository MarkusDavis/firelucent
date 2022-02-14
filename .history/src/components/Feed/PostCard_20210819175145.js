import React, { useState } from "react";
import UserPosts from "../UserPosts/UserPosts.js";
import clsx from "clsx";
import { makeStyles, Card, IconButton, Grid, Box } from "@material-ui/core";
import AddCommentIcon from "@material-ui/icons/AddComment";
import AddCommentOutlinedIcon from "@material-ui/icons/AddCommentOutlined";
import Comments from "../Comments/Comments";

import PostComments from "./PostComments.js";

function BookCard({ item }) {
  const { id } = item;

  const [addComment, setAddComment] = useState(false);

  const handleExpandComment = () => {
    setAddComment((prevState) => !prevState);
  };

  return (
    <div>
      <Card key={id}>
        <UserPosts item={item} />
        <Box className={classes.box}>
          <IconButton
            style={{ background: "#fff" }}
            className={clsx(classes.button)}
            onClick={handleExpandComment}
            aria-expanded={addComment}
          >
            {addComment ? <AddCommentIcon /> : <AddCommentOutlinedIcon />}
          </IconButton>
        </Box>
        <PostComments addComment={addComment} item={item} />
        <Comments item={item} />
      </Card>
    </div>
  );
}

export default BookCard;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: "flex",
    flexDirection: "flex-start",
    "@media(max-width: 800px)": {
      margin: "0 auto",
    },
  },
  root: {
    width: 300,
    minHeight: 500,
    margin: "0 auto",
  },
  review: {
    margin: "0",
    marginLeft: "9px",
    paddding: "0",
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "10px",
  },
  button: {
    margin: "0",
    paddding: "0",
    display: "flex",
    justifyContent: "flex-end",
    background: "#fff",
  },
  box: {
    margin: "0",
    paddding: "0",
    display: "flex",
    justifyContent: "flex-end",
    height: "20px",
  },
}));
