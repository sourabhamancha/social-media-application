import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import MyButton from "../../util/MyButton";
import ProfileSkeleton from "../../util/ProfileSkeleton";
// MUI stuff
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

export class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    let fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper>
          <Box display="flex" justifyContent="center" p={0.2}>
            <Box p={0.2} style={{ marginTop: "20px" }}>
              <img
                src={imageUrl}
                alt="profile"
                style={{
                  width: 150,
                  height: 150,
                  objectFit: "cover",
                  maxWidth: "100%",
                  borderRadius: "50%",
                }}
              />
              <Box p={0.2}>
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <MyButton
                  tip="Edit profile picture"
                  onClick={this.handleEditPicture}
                  placement="top"
                >
                  <InsertPhotoOutlinedIcon color="primary" />
                </MyButton>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" p={0.2}>
            <Box p={0.2}>
              <MuiLink
                color="primary"
                component={Link}
                to={`/user/${handle}`}
                variant="h5"
                style={{ marginTop: "10px" }}
              >
                @{handle}
              </MuiLink>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" p={0.2}>
            <Box p={0.2}>
              {bio && (
                <Typography
                  style={{ marginTop: "10px", maxWidth: "100%" }}
                  variant="body2"
                >
                  {bio}
                </Typography>
              )}
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" p={0.2}>
            <Box p={0.2}>
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                </Fragment>
              )}
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" p={0.2}>
            <Box p={0.2}>
              {website && (
                <Fragment style={{ marginTop: "10px" }}>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                </Fragment>
              )}
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" p={0.2}>
            <Box p={0.2}>
              <CalendarToday style={{ marginTop: "10px" }} color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </Box>
          </Box>

          <Box display="flex" flexDirection="row-reverse" p={0.5} m={0.5}>
            <Box p={0.5}>
              <EditDetails />
            </Box>
            {true ? null : (
              <Box p={0.5}>
                <MyButton
                  tip="Logout"
                  placement="top"
                  onClick={this.handleLogout}
                >
                  <KeyboardReturn color="primary" />
                </MyButton>
              </Box>
            )}
          </Box>
        </Paper>
      ) : (
        <Paper variant="outlined" style={{ height: 100 }}>
          <div style={{ margin: "auto" }}>
            <p>Login to access your account</p>
          </div>

          <div style={{ marginTop: "15px" }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>{" "}
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );
    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
