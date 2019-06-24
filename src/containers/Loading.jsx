/**
 * @description : This components renders a progress loader on the screen
 *
 * @prop logoWidth (number) : Custome width for logo image
 * @prop logoHeight (number) : Custome height for logo image
 * @prop progressWidth (number) : Custome width for progress element
 *
 * @method render
 *
 * @author Ali Aryani
 * @version 1.0.0
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1
  }
};

class Loading extends Component {
  render() {
    // const { classes } = this.props;

    return (
      <div style={{ textAlign: "center", marginTop: "15%" }}>
        <div
          style={{
            width: this.props.progressWidth ? this.props.progressWidth : 56,
            margin: "auto",
            direction: "ltr"
          }}
        >
          <LinearProgress
            mode="indeterminate"
            style={{ direction: "ltr", marginTop: 8 }}
          />
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  logoWidth: PropTypes.number,
  logoHeigh: PropTypes.number,
  progressWidth: PropTypes.number
};

export default withStyles(styles)(Loading);
