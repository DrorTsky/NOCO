import React, { Component } from "react";
import ChooseFriendsForRotationRequest from "./ChooseFriendsForRotationRequest";

export class Rotation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(this);
    return (
      <div>
        <ChooseFriendsForRotationRequest {...this.props} />{" "}
      </div>
    );
  }
}

export default Rotation;
