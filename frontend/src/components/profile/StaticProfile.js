import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = () => ({});

const StaticProfile = (props) => {
  const {
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;

  return (
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
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" p={0.2}>
        <Box p={0.2}>
          <MuiLink
            color="primary"
            component={Link}
            to={`/users/${handle}`}
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
        <Box p={0.2} style={{ marginTop: "10px", marginBottom: "50px" }}>
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </Box>
      </Box>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
