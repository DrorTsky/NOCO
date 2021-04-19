import React, { Component } from "react";
import { CListGroupItem } from "@coreui/react";

export class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // console.log(this);
    let typeOfCard, message;
    if (this.props.to === this.props.myAddress) {
      typeOfCard = "success";
      message = `${this.props.amount} || From: ${this.props.myName}, To:
          ${this.props.friendsName}`;
    } else {
      typeOfCard = "danger";
      message = `${this.props.amount} || From: ${this.props.friendsName}, To:
          ${this.props.myName}`;
    }

    return (
      <div>
        <CListGroupItem accent={typeOfCard} color={typeOfCard}>
          {message}
        </CListGroupItem>
      </div>
    );
  }
}

export default Transaction;
