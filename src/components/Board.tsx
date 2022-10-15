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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoggedInContext } from "./context/LoggedInContext";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
type DataType = {
  data: ["", "", ""];
};
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
  const [date, setDate] = useState("");
  const [posts, setPosts] = useState<any>([]);

  const { userAvatarColor, userId } = useContext(LoggedInContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`/api/posts/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const postsValue = await res.json();
      setPosts([...postsValue]);
    };
    getPosts();
  }, []);
  console.log(posts, "eng???");
  return (
    <>
      {posts.map((item: DataType, index: number) => {
        let postDate = item.data[2].split("T");
        return (
          <Card sx={{ maxWidth: 345, margin: "100px auto" }} key={index}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: `${userAvatarColor}` }}
                  aria-label="post"
                >
                  {userId.charAt(0)}
                </Avatar>
              }
              title={item.data[0]}
              subheader={postDate[0]}
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.data[1]}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
                <Typography paragraph>hello</Typography>
                <Typography paragraph>helloooo</Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </>
  );
};

export default Board;
