import React, { Component } from "react";
import Exchanges from "./Exchanges";

export class RotationRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // console.log(this);
    return (
      <div>
        <Exchanges type="2" profile={this.props.profile} {...this.props} />
      </div>
    );
  }
}

export default RotationRequests;
