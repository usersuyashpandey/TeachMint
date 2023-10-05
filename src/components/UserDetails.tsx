import { Link, useLocation, useParams } from "react-router-dom";
import { Tuser } from "../utils/types";
import { Box, Typography, Button, Grid, Modal, Paper } from "@mui/material";
import { useState } from "react";
import { ModalStyle } from "../utils/style/ModalStyle";

const UserDetails = ({ user }: { user: Tuser[] }) => {
  let { userId } = useParams();
  const { postData } = useLocation().state;
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isHovering, setIsHovering] = useState(new Array(3).fill(false));

  const handleMouseOver = (index: number) => {
    const updatedIsHovering = [...isHovering];
    updatedIsHovering[index] = true;
    setIsHovering(updatedIsHovering);
  };

  const handleMouseOut = (index: number) => {
    const updatedIsHovering = [...isHovering];
    updatedIsHovering[index] = false;
    setIsHovering(updatedIsHovering);
  };

  const userDetails = user?.find((item: any) => item?.id === Number(userId));

  const handleModalClick = (id: number) => {
    if (postData) {
      const selectedPost = postData[id];
      setSelectedPost(selectedPost);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const truncateString = (
    string: string,
    maxLength: number = 10,
    suffix: string = "..."
  ) => {
    if (string.length <= maxLength) {
      return string;
    } else {
      return string.substring(0, maxLength) + suffix;
    }
  };

  return (
    <Box m={2}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained">Back</Button>
      </Link>
      <Typography
        justifyContent={"center"}
        display={"flex"}
        mb={2}
        mt={-4}
        variant="h5"
      >
        Profile Page
      </Typography>

      <Box
        display={"flex"}
        justifyContent={"center"}
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            border: 1,
            bgcolor: "aliceblue",
            borderRadius: 3,
            borderColor: "cadetblue",
            width: "100%",
            maxWidth: 1000,
            padding: 1,
            marginBottom: 2,
          }}
          p={1}
        >
          <Box p={1}>
            <Typography variant="subtitle2" noWrap>
              {userDetails?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography mr={1} variant="subtitle2" noWrap>
                {userDetails?.username}
              </Typography>
              |
              <Typography ml={1} variant="subtitle2" noWrap>
                {userDetails?.company?.catchPhrase}
              </Typography>
            </Box>
          </Box>
          <Box p={1}>
            <Typography
              variant="subtitle2"
              noWrap
            >{`${userDetails?.address?.suite}, ${userDetails?.address?.street}, ${userDetails?.address?.city}, Pincode: ${userDetails?.address?.zipcode}, Geolocation: (${userDetails?.address?.geo?.lat}, ${userDetails?.address?.geo?.lat})`}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Typography mr={1} variant="subtitle2" noWrap>
                {userDetails?.email}
              </Typography>
              |
              <Typography ml={1} variant="subtitle2" noWrap>
                {userDetails?.phone}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={2}>
        <Grid container justifyContent="center">
          {postData?.slice(0, 3)?.map((item, index) => (
            <>
              <Grid
                item
                sm={6}
                md={6}
                lg={2}
                key={item.id}
                p={1}
                mr={10}
                sx={{
                  border: 1,
                  bgcolor: "aliceblue",
                  borderRadius: 3,
                  borderColor: "cadetblue",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: isHovering ? `rgba(0,0,0,0.2)` : "",
                  },
                  justifySelf: "center",
                }}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={() => handleMouseOut(index)}
                onClick={() => handleModalClick(index)}
              >
                {isHovering[index] && (
                  <Box>
                    <Typography textAlign={"center"} variant="subtitle1">
                      Click to view full detail
                    </Typography>
                  </Box>
                )}
                {!isHovering[index] && (
                  <>
                    <Typography variant="subtitle1" noWrap>
                      {truncateString(item.title)}
                    </Typography>
                    <Typography variant="body2" noWrap>
                      {truncateString(item.body, 40)}
                    </Typography>
                  </>
                )}
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedPost?.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedPost?.body}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserDetails;
