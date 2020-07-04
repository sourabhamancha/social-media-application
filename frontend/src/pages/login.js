import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  from: {
    textAlign: "center",
  },
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid
        container
        className={classes.from}
        style={{ margin: "auto", width: "1200px", height: "600px" }}
      >
        <Grid item sm></Grid>
        <Grid
          item
          sm
          style={{
            margin: "auto",
            backgroundColor: "rgb(255, 255, 255)",
            border: "2px gray",
            borderRadius: "10px",
            boxShadow: "3px 3px 8px #888888",
          }}
        >
          <Typography variant="h5" style={{ marginTop: "30px" }}>
            Login
          </Typography>
          <form
            noValidate
            onSubmit={this.handleSubmit}
            style={{ padding: "50px" }}
          >
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              style={{
                marginTop: "10px",
                backgroundColor: "rgb(255, 255, 255)",
              }}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              style={{
                marginTop: "10px",
                backgroundColor: "rgb(255, 255, 255)",
              }}
            />
            {errors.general && (
              <Typography
                variant="body2"
                style={{ marginTop: "5px", color: "red", fontSize: "0.8rem" }}
              >
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", position: "relative" }}
              fullWidth
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={25} style={{ position: "absolute" }} />
              )}
            </Button>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.ui,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
