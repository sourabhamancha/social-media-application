import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import Notifications from "./Notifications";
//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import PostScream from "../scream/PostScream";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

class Navbar extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogout = () => {
    this.props.logoutUser();
    this.setState({ open: false });
  };
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <AppBar color="primary" position="static">
          <Toolbar>
            {authenticated ? (
              <Fragment>
                <div style={{ marginRight: "auto" }}>
                  <Link to="/">
                    <MyButton tip="Home">
                      <HomeIcon style={{ color: "#fff" }} />
                    </MyButton>
                  </Link>
                  <Notifications />
                </div>
                <div style={{ margin: "auto" }}>
                  <Link
                    to="/"
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    <Typography variant="h6">Scream</Typography>
                  </Link>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  {true ? null : <PostScream />}

                  {true ? null : (
                    <MyButton onClick={this.handleLogout}>
                      <KeyboardReturn style={{ color: "#fff" }} />
                    </MyButton>
                  )}

                  <div>
                    <Button
                      variant="outlined"
                      onClick={this.handleClickOpen}
                      style={{ color: "#fff" }}
                    >
                      Logout
                    </Button>
                    <Dialog
                      fullWidth
                      open={this.state.open}
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Please confirm"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to logout?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Disagree
                        </Button>
                        <Button
                          onClick={this.handleLogout}
                          color="primary"
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div style={{ marginRight: "auto" }}>
                  <Link to="/">
                    <MyButton tip="Home">
                      <HomeIcon style={{ color: "#fff" }} />
                    </MyButton>
                  </Link>
                </div>
                <div style={{ margin: "auto" }}>
                  <Link
                    to="/"
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    <Typography variant="h6">Scream</Typography>
                  </Link>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <Button color="inherit" component={Link} to="/signup">
                    Signup
                  </Button>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                </div>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
const mapActionsToProps = { logoutUser };

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
