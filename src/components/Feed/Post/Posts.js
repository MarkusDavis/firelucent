import React, { useContext, useEffect, useState } from "react";
import {
  makeStyles,
  CardHeader,
  CardMedia,
  Box,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../services/Auth";
import CloseIcon from "@material-ui/icons/Close";
import { db } from "../../../lib/firebase";
import { goToBookReview } from "../../../routes/Cordinator";

function BookPosts({ item }) {
  const history = useHistory();

  const [showClose, setShowClose] = useState(false);

  const { post, id } = item;
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    if (!!currentUser) {
      if (currentUser.displayName === "admin") {
        setShowClose(true);
      }
    }
  }, [currentUser]);

  const onClickDelete = (id) => {
    db.collection("posts").doc(id).delete();
    db.collection("posts").doc(id).collection("comments").delete();
  };

  return (
    <Box key={id} className={classes.bookInformation}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardHeader
          style={{ textTransform: "capitalize" }}
          avatar={
            
            <Link to="/profile"><Avatar className={classes.avatar}>
              {post.username.substr(0, 1)}
            </Avatar></Link>
          }
          title={post.username}
        />
        <Button
          type="submit"
          onClick={() => onClickDelete(id)}
          startIcon={showClose && <CloseIcon style={{ color: "gray" }} />}
        />
      </Box>
      <Typography className={classes.bookTitle}>{post.title}</Typography>
      <Box onClick={() => goToBookReview(history, id)}>
        <CardMedia
          component={"img"}
          className={classes.media}
          image={post.imageUrl}
          title={post.imageUrl}
        />
      </Box>
    </Box>
  );
}

export default BookPosts;

const useStyles = makeStyles({
  bookInformation: {
    height: 330,
  },
  media: {
    width: 150,
    height: 200,
    margin: "0 auto",
  },
  bookTitle: {
    textAlign: "center",
    height: "55px",
    fontSize: "15px",
    fontWeight: "bold",
  },
  avatar: {
    height: "28px",
    width: "28px",
  },
});
