import React, { Component } from "react";
import Transaction from "./Transaction";

import { CCard, CCardBody, CListGroup } from "@coreui/react";

export class TransactionLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTransactions: props.allTransactions,
    };
  }

  render() {
    // console.log(this);
    const items = [];
    for (const [index, value] of Object.entries(this.state.allTransactions)) {
      // console.log(value);
      items.push(
        <Transaction
          key={index}
          myName={this.props.myName}
          myAddress={this.props.myAddress}
          friendsName={this.props.friendsName}
          {...value}
        />
      );
    }
    return (
      <div>
        <CCard>
          <CCardBody className="scrollable">
            <CListGroup accent>{items}</CListGroup>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default TransactionLog;
