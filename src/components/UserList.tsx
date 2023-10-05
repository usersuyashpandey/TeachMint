import { Link } from "react-router-dom";
import { Tpost, Tuser } from "../utils/types";
import { Box, Typography, List } from "@mui/material";

type TuserListProps = { users: Tuser[]; posts: Tpost[] };

const UserList = ({ users, posts }: TuserListProps) => {
  function getUserPostsByUserId(userId: number): Tpost[] {
    const postObject = posts.filter((post) => post.userId === userId);
    return postObject;
  }

  const postCounts = users.map((user) => ({
    userId: user.id,
    postCount: getUserPostsByUserId(user.id).length,
    postObject: getUserPostsByUserId(user.id),
  }));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <List>
        <Typography justifyContent={"center"} display={"flex"} mb={2}>
          Directory
        </Typography>
        {users.map((item) => (
          <Box
            key={item.id}
            sx={{
              border: 1,
              bgcolor: "aliceblue",
              borderRadius: 3,
              borderColor: "cadetblue",
              "&:hover": {
                backgroundColor: `rgba(0, 0, 0, 0.1)`,
              },
            }}
            mb={2}
            p={1}
          >
            <Link
              to={`/user/${item.id}`}
              state={{ postData: getUserPostsByUserId(item.id) }}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{`Name: ${item.name}`}</Typography>
                <Typography ml={20}>{`Posts: ${
                  postCounts.find((count) => count.userId === item.id)
                    ?.postCount || 0
                }`}</Typography>
              </Box>
            </Link>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
