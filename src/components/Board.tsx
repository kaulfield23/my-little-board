import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoggedInContext } from "./context/LoggedInContext";
import { Box, Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Board = () => {
  const [expanded, setExpanded] = useState(false);
  const { userAvatarColor, userId } = useContext(LoggedInContext);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`api/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const body = await res.json();
      console.log(body, "this is res");
    };
    getPosts();
  }, []);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fef2a1",
          width: { xs: "300px", md: "500px" },
          margin: "100px auto",
          p: 5,
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontFamily: "monospace", fontSize: "1.5rem" }}>
          There are no posts yet!
        </Typography>
      </Box>
      <Fab sx={{ position: "absolute", bottom: 16, right: 15 }} color="warning">
        <Tooltip title="Add post">
          <AddIcon />
        </Tooltip>
      </Fab>
    </>
    // <Card sx={{ maxWidth: 345, margin: "100px auto" }}>
    //   <CardHeader
    //     avatar={
    //       <Avatar sx={{ bgcolor: `${userAvatarColor}` }} aria-label="post">
    //         {userId.charAt(0)}
    //       </Avatar>
    //     }
    //     title="Hello world"
    //     subheader="September 14, 2016"
    //   />
    //   <CardMedia
    //     component="img"
    //     height="194"
    //     // image="/static/images/cards/paella.jpg"
    //     alt="Paella dish"
    //   />
    //   <CardContent>
    //     <Typography variant="body2" color="text.secondary">
    //       This impressive paella is a perfect party dish and a fun meal to cook
    //       together with your guests. Add 1 cup of frozen peas along with the
    //       mussels, if you like.
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing>
    //     <IconButton aria-label="add to favorites">
    //       <FavoriteIcon />
    //     </IconButton>

    //     <ExpandMore
    //       expand={expanded}
    //       onClick={handleExpandClick}
    //       aria-expanded={expanded}
    //       aria-label="show more"
    //     >
    //       <ExpandMoreIcon />
    //     </ExpandMore>
    //   </CardActions>
    //   <Collapse in={expanded} timeout="auto" unmountOnExit>
    //     <CardContent>
    //       <Typography paragraph>Method:</Typography>
    //       <Typography paragraph>
    //         Heat 1/2 cup of the broth in a pot until simmering, add saffron and
    //         set aside for 10 minutes.
    //       </Typography>
    //       <Typography paragraph>hello</Typography>
    //       <Typography paragraph>helloooo</Typography>
    //     </CardContent>
    //   </Collapse>
    // </Card>
  );
};

export default Board;
