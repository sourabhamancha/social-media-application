import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from "../images/no-image.png";
// MUI
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = () => ({
  handle: {
    height: 20,
    width: 60,
    margin: "0 auto 7px auto",
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: 10,
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img
            src={NoImg}
            alt="profile"
            style={{
              width: 150,
              height: 150,
              objectFit: "cover",
              maxWidth: "100%",
              borderRadius: "50%",
            }}
          />
        </div>
        <hr style={{ border: "0" }} />
        <div className="profile-details">
          <div className={classes.handle} style={{ marginTop: "10px" }} />
          <hr style={{ border: "0" }} />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr style={{ border: "0" }} />
          <LocationOn color="primary" style={{ marginTop: "10px" }} />{" "}
          <span>Location</span>
          <hr style={{ border: "0" }} />
          <LinkIcon color="primary" style={{ marginTop: "10px" }} />{" "}
          https://website.com
          <CalendarToday color="primary" style={{ marginTop: "10px" }} /> Joined
          date
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
