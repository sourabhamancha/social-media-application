import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
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

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
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
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
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
        style={{ margin: "auto", width: "1200px", height: "700px" }}
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
          <Typography variant="h5" style={{ marginTop: "20px" }}>
            Signup
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="outlined"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              style={{
                marginTop: "10px",
                backgroundColor: "rgb(255, 255, 255)",
              }}
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Name"
              variant="outlined"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
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
              Signup
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

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.ui,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
