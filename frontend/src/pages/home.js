import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import AddScream from "../components/scream/AddScream";
// MUI
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { authenticated } = this.props;
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={3} style={{ marginTop: "10px" }}>
        <Grid
          item
          sm={3}
          xs={12}
          style={{ marginLeft: "50px", textAlign: "center" }}
        >
          <Profile />
        </Grid>
        <Grid item sm={7} xs={12} style={{ textAlign: "center" }}>
          {authenticated && <AddScream />}
          {recentScreamsMarkup}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { getScreams })(home);
