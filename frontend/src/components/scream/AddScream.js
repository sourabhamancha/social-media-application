import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";

// Redux stuff
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

const styles = () => ({
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
});

class AddScream extends Component {
  state = {
    body: "",
    errors: {},
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
    this.setState({ body: "" });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <div
        style={{
          padding: 20,
          position: "relative",
          display: "flex",
          marginBottom: 20,
          border: "2px gray",
          borderRadius: "10px",
          boxShadow: "3px 3px 8px #888888",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <FormControl fullWidth>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Add New Post"
              multiline
              rows="3"
              placeholder="Type here"
              error={errors.body ? true : false}
              helperText={errors.body}
              value={this.state.body}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </FormControl>
      </div>
    );
  }
}
AddScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.ui,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(AddScream)
);
